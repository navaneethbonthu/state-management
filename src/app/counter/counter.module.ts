import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { CounterComponent } from './counter.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterValueComponent } from './counter-value/counter-value.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { counterReducer } from './states/counter.reducer';
import { StoreModule } from '@ngrx/store';
import { COUNTER_STATE } from '../constants/constants';

const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
];

@NgModule({
  declarations: [
    CounterComponent,
    CounterValueComponent,
    CounterButtonComponent,
    CustomInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COUNTER_STATE, counterReducer),
  ],
  exports: [],
})
export class CounterModule {}
