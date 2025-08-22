import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { appState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCourses } from './states/courses.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;
  constructor(private store: Store<appState>) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getCourses);
  }
}
