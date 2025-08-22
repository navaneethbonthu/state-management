import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../states/counter.state';

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.css'],
})
export class CounterValueComponent implements OnInit {
  count: number = 0;

  constructor(private store: Store<{ counter: counterState }>) {}

  ngOnInit(): void {
    this.store.select('counter').subscribe((data) => {
      this.count = data.counter;
    });
  }
}
