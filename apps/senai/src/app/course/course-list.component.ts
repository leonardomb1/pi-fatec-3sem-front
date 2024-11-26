import { Component, inject, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { map, shareReplay } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICourse } from '../../interfaces/course.interface';
import { randomImages } from '../images';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {
  private apiService = inject(ApiService);

  isFilterOpen = false;

  filterName = '';

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  get filteredCourses() {
    return this.courses()?.filter(course =>
      course.nomeCurso.toLowerCase().includes(this.filterName.toLowerCase())
    );
  }

  courses$ = this.apiService.courseService.get().
  pipe(map(({ message }) => {
    return message.map((course: ICourse) => {
      return {
        ...course,
        photo: randomImages[Math.floor(Math.random() * randomImages.length)]
      }
    })
  }), shareReplay(1));

  courses = toSignal(this.courses$);
}
