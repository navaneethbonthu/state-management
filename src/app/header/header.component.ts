import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { getLoggedUser } from '../auth/states/auth.selector';
import { logout } from '../auth/states/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<appState>) {}

  loggedUser$: Observable<User | null> | null = null;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(getLoggedUser);
    //   .subscribe((res) => {
    //   console.log('this.loggedUser$ ', res);
    // });
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
