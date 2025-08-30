import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { appState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getAccessToken } from '../auth/states/auth.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<appState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(getAccessToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({
          params: req.params.append('auth', token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
