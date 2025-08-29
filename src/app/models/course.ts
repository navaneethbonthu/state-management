export interface Course {
  id?: string;
  title: string;
  description: string;
  image: string;
  author: string;
  price: number;
}

export interface CoursesResponse {
  [key: string]: Course;
}
