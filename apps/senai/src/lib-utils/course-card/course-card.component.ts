import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from '../../interfaces/course.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() course!: ICourse;

  @Input() routeTo = '';

  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  onCourseClick() {
    this.route.navigate([`${this.routeTo}${this.course.id}`], {
      relativeTo: this.activatedRoute
    });
  }
}
