import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../store/app.state';
import { setErrorMessage } from '../shared/shared.action';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})
export class ToasterComponent implements OnInit {
  @Input() errorMessage: string | null = '';

  constructor(private store: Store<appState>) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(setErrorMessage({ message: '' }));
    }, 5000);
  }
}
