import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../states/counter.state';
import { customIncrement, customToggle } from '../states/counter.action';
import { getCounterState, getToggle } from '../states/counter.selector';
import { Observable } from 'rxjs';
import { appState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit {
  customCounter: number = 0;
  showCustomeToggle$: Observable<boolean> | null = null;

  constructor(private store: Store<appState>) {}
  ngOnInit(): void {
    this.showCustomeToggle$ = this.store.select(getToggle);
  }

  onCustomeIncrementBtn() {
    this.store.dispatch(customIncrement({ value: +this.customCounter }));
  }

  onCustomeToggleBtn() {
    this.store.dispatch(customToggle());
  }
}
