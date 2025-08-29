import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import {
  createCourse,
  showFormAction,
  updateCourse,
} from '../states/courses.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { getEditMode, getSelectedCourse } from '../states/courses.selector';
import { Course } from 'src/app/models/course';
import { combineLatest } from 'rxjs';
import { ref, uploadBytes } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  constructor(
    private store: Store<appState>,
    private courseService: CourseService
  ) {}

  coursesForm!: FormGroup;
  isEdit: boolean = false;
  course: Course | null = null;
  selectedImage: File | null = null;

  ngOnInit(): void {
    this.init();
    combineLatest([
      this.store.select(getEditMode),
      this.store.select(getSelectedCourse),
    ]).subscribe(([isEditMode, course]) => {
      if (course && isEditMode) {
        this.isEdit = isEditMode;
        this.course = course;
        this.coursesForm.patchValue(course);
      } else if (!isEditMode) {
        this.coursesForm.reset();
      }
    });
  }

  init() {
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
      image: new FormControl(''),
    });
  }
  hideCreateForm() {
    this.store.dispatch(showFormAction({ value: false }));
  }

  async onFormSubmit() {
    if (!this.coursesForm.valid) {
      console.log('form not valid', this.coursesForm?.value);
    }
    if (this.isEdit) {
      if (!this.course || !this.course.id) {
        // Check if course or its ID is missing
        return; // Prevent submission
      }
      const updatedCourse: Course = {
        id: this.course!.id,
        title: this.coursesForm.value.title!,
        description: this.coursesForm.value.description!,
        author: this.coursesForm.value.author!,
        image: '',
        price: this.coursesForm.value.price!,
      };
      console.log('updatedCourse', updatedCourse.id);
      this.store.dispatch(updateCourse({ course: updatedCourse }));
    } else {
      const url = this.courseService.uploadImage(this.selectedImage);
      this.coursesForm.patchValue({
        Image: 'https://dummyimage.com/qvga',
      });

      this.store.dispatch(createCourse({ course: this.coursesForm.value }));
    }

    console.log('show form called');

    this.store.dispatch(showFormAction({ value: false }));
  }

  handleTitleValidationErrors() {
    const titleControl = this.coursesForm.get('title');
    if (titleControl?.touched && titleControl.invalid) {
      if (titleControl?.errors?.['required']) {
        return 'title is required field';
      }
      if (titleControl?.errors?.['minlength']) {
        return 'Minlength is required field';
      }
      if (titleControl?.errors?.['maxlength']) {
        return 'Maxlength is required field';
      }
      return 'An unexpected validation error occurred';
    } else {
      return '';
    }
  }
  handleDescriptionValidationErrors() {
    const desControl = this.coursesForm.get('description');
    if (desControl?.touched && desControl.invalid) {
      if (desControl?.errors?.['required']) {
        return 'description is required field';
      }
      if (desControl?.errors?.['minlength']) {
        return 'Minlength is required field';
      }
      if (desControl?.errors?.['maxlength']) {
        return 'Maxlength is required field';
      }
      return 'An unexpected validation error occurred';
    } else {
      return '';
    }
  }

  handleAuthorValidationErrors() {
    const authorControl = this.coursesForm.get('author');
    if (
      authorControl?.touched &&
      authorControl.invalid &&
      authorControl?.errors?.['required']
    ) {
      if (authorControl?.errors?.['required']) {
        return 'authorControl is required field';
      }
      if (authorControl?.errors?.['minlength']) {
        return 'Minlength is required field';
      }
      if (authorControl?.errors?.['maxlength']) {
        return 'Maxlength is required field';
      }
      return 'An unexpected validation error occurred';
    } else {
      return '';
    }
  }

  onFileSelected(event: Event): void {
    const inputEle = event.target as HTMLInputElement;
    if (inputEle.files && inputEle.files.length > 0) {
      this.selectedImage = inputEle.files[0];

      const fileNameSpan = document.querySelector('.file-name');
      if (fileNameSpan) {
        fileNameSpan.textContent = this.selectedImage.name;
      }
    }
  }
}
