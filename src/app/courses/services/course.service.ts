import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environment';
import { Course } from 'src/app/models/course';

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
}
