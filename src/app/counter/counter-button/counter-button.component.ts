import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../states/counter.action';
import { counterState } from '../states/counter.state';
import { appState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css'],
})
export class CounterButtonComponent {
  constructor(private store: Store<appState>) {}
  onIncermentBtn() {
    this.store.dispatch(increment());
  }
  onDecrementBtn() {
    this.store.dispatch(decrement());
  }
  onResettBtn() {
    this.store.dispatch(reset());
  }
}
