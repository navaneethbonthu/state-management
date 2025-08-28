import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from './store/app.state';
import { getIsLoading } from './shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'state-management';
  isLoading$: Observable<boolean> | null = null;

  constructor(private store: Store<appState>) {}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
  }
}
