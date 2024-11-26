import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from './course-card/course-card.component';
import { FormFieldComponent } from './form-field/form-field.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, CarouselComponent, CourseCardComponent, FormFieldComponent],
  imports: [CommonModule, NgIf, NgFor, CarouselModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, CarouselComponent, CourseCardComponent, FormFieldComponent],
})
export class LibUtilsModule {}
