import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CounterComponent } from './counter/counter.component';
import { HeaderComponent } from './header/header.component';
import { CounterValueComponent } from './counter/counter-value/counter-value.component';
import { CounterButtonComponent } from './counter/counter-button/counter-button.component';
import { CustomInputComponent } from './counter/custom-input/custom-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './counter/states/counter.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CounterComponent,
    HeaderComponent,
    CounterValueComponent,
    CounterButtonComponent,
    CustomInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ counter: counterReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
