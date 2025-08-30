import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from './states/courses.reducer';
import { COURSES_STATE } from '../constants/constants';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffect } from './states/courses.effect';
import { canActivateFn } from '../guards/auth.guard';
import { CourseDetailsComponent } from './course-details/course-details.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [canActivateFn],
  },
  {
    path: ':id',
    component: CourseDetailsComponent,
    canActivate: [canActivateFn],
  },
];

@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    AddCourseComponent,
    CourseDetailsComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COURSES_STATE, coursesReducer),
    EffectsModule.forFeature([CoursesEffect]),
  ],
  exports: [],
})
export class CoursesModuel {}
