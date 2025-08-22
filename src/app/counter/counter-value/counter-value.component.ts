import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from '../states/counter.state';
import { getCounter } from '../states/counter.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter-value',
  templateUrl: './counter-value.component.html',
  styleUrls: ['./counter-value.component.css'],
})
export class CounterValueComponent implements OnInit {
  count$: Observable<number> | null = null;

  constructor(private store: Store<{ counter: counterState }>) {}

  ngOnInit(): void {
    this.count$ = this.store.select(getCounter);
  }
}
