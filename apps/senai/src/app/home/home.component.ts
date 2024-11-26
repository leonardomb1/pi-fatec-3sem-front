import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';
import { signal } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { randomImages } from '../images';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private apiService = inject(ApiService);

  carouselCourses = signal<ICourse[]>([]);

  coursesList = signal<ICourse[]>([])

  courses$ = this.apiService.courseService.get().pipe(map(({ message }) => {
    const dataWithPhotos = message.map((course: ICourse) => {
      const index = Math.floor(Math.random() * this.carouselCourses.length);
      return {
        ...course,
        photo: randomImages[index]
      }
    })
    const sortedData = dataWithPhotos.sort(() => Math.random() * 100);

    this.carouselCourses.set(sortedData);
    this.coursesList.set(dataWithPhotos);

    return message
  })).subscribe(() => {});

}
