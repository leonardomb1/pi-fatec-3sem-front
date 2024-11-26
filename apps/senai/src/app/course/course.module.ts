import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list.component';
import { FormsModule } from '@angular/forms';
import { LibUtilsModule } from "../../lib-utils/lib-utils.module";
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [CourseListComponent, CourseDetailsComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    LibUtilsModule,
    ToastModule
]
})
export class CourseModule { }
