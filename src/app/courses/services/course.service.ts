import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map, Observable } from 'rxjs';
import { environments } from 'src/app/environments/environment';
import { Course, CoursesResponse } from 'src/app/models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(
    private angularFireStorage: AngularFireStorage,
    private httpClient: HttpClient
  ) {}
  uploadImage(image: File | null) {
    const path = 'course/images/' + Date.now() + '_' + image?.name;
    // const task = await this.angularFireStorage.upload(
    //   path,
    //   this.selectedImage
    // );
    // const url = await task.ref.getDownloadURL();
  }

  createCourse(course: Course): Observable<{ name: string }> {
    const url = `${environments.firebaseConfig.databaseURL}/courses.json`;
    return this.httpClient.post<{ name: string }>(url, course);
  }

  readCourses(): Observable<Course[]> {
    const url = `${environments.firebaseConfig.databaseURL}/courses.json`;
    return this.httpClient.get<CoursesResponse>(url).pipe(
      map((res) => {
        const courses: Course[] = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            const course = { ...res[key], id: key };
            courses.push(course);
          }
        }
        return courses;
      })
    );
  }

  updateCourse(course: Course): Observable<{ name: string }> {
    if (!course?.id) {
      throw new Error('Course ID is required to update a course.');
    }
    const { id, ...courseWithoutId } = course;
    const courseData = { [id]: courseWithoutId };
    const url = `${environments.firebaseConfig.databaseURL}/courses.json`;
    return this.httpClient.patch<{ name: string }>(url, courseData);
  }
}
