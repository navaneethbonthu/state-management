import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { createCourse, showFormAction } from '../states/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  constructor(private store: Store<appState>) {}

  coursesForm!: FormGroup;

  ngOnInit(): void {
    this.coursesForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(1),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
      ]),
      author: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
      ]),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  hideCreateForm() {
    this.store.dispatch(showFormAction({ value: false }));
  }

  onFormSubmit() {
    if (!this.coursesForm.valid) {
      console.log('form not valid', this.coursesForm?.value);
    } else {
      this.store.dispatch(createCourse({ course: this.coursesForm.value }));
      this.store.dispatch(showFormAction({ value: false }));
    }
  }
}
