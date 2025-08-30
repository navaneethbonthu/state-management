import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { inject } from '@angular/core';
import { getLoggedUser } from '../auth/states/auth.selector';
import { map } from 'rxjs';

export const canActivateFn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store<appState> = inject(Store);
  const router: Router = inject(Router);

  return store.select(getLoggedUser).pipe(
    map((user) => {
      if (!user) {
        return router.createUrlTree(['auth', 'login']);
      }
      return true;
    })
  );
};
