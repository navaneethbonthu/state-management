import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private angularFireStorage: AngularFireStorage) {}
  uploadImage(image: File | null) {
    const path = 'course/images/' + Date.now() + '_' + image?.name;
    // const task = await this.angularFireStorage.upload(
    //   path,
    //   this.selectedImage
    // );
    // const url = await task.ref.getDownloadURL();
  }
}
