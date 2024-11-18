import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, CarouselComponent],
  imports: [CommonModule, NgIf, NgFor, CarouselModule, BrowserAnimationsModule],
  exports: [NavbarComponent, FooterComponent, CarouselComponent],
})
export class LibUtilsModule {}
