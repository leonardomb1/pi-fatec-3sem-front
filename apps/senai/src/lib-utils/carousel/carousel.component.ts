import { Component, inject, Input } from '@angular/core';
import { ICourse } from '../../interfaces/course.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  @Input() courses: ICourse[] = [];
  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.courses.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.courses.length) % this.courses.length;
  }

  goToCourse(id: number): void {
    this.router.navigate([`/courses/${id}`], {
      relativeTo: this.activatedRoute
    });
  }
}
