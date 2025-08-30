import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/store/app.state';
import { getCourseById, getSelectedCourse } from '../states/courses.selector';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  id: string | null = null;
  selectedCourse$: Observable<Course> | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<appState>
  ) {}

  ngOnInit(): void {
    if (this.id) {
      // this.selectedCourse$ = this.store.select(getCourseById(this.id)).pipe(
      //   // Filter out any `undefined` values from the stream.
      //   // The stream will now only emit a value if the course exists.
      //   filter((course): course is Course => !!course)
      // );
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      // this.selectedCourse$ = this.store.select(getCourseById(this.id!));
    }
  }
}
