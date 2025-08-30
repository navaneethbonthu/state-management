import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Course } from 'src/app/models/course';
import { appState } from 'src/app/store/app.state';
import {
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showFormAction,
} from '../states/courses.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() course: Course | null = null;

  constructor(private store: Store<appState>, private router: Router) {}

  onEditCourse() {
    this.store.dispatch(showFormAction({ value: true }));
    this.store.dispatch(setEditMode({ value: true }));
    this.store.dispatch(setSelectedCourse({ course: this.course }));
  }

  onDeleteCourse() {
    if (this.course?.id) {
      this.store.dispatch(deleteCourse({ id: this.course.id }));
    }
  }
  onViewCourseDetails() {
    this.router.navigate(['courses', this.course?.id]);
  }
}
