import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../states/counter.state';
import { customIncrement, customToggle } from '../states/counter.action';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent implements OnInit {
  customCounter: number = 0;
  showCustomeToggle: boolean = false;

  constructor(private store: Store<{ counter: counterState }>) {}
  ngOnInit(): void {
    this.store.select('counter').subscribe((data) => {
      this.showCustomeToggle = data.toggle;
    });
  }

  onCustomeIncrementBtn() {
    this.store.dispatch(customIncrement({ value: +this.customCounter }));
  }

  onCustomeToggleBtn() {
    this.store.dispatch(customToggle());
  }
}
