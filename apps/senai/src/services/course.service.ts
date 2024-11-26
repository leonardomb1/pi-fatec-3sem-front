import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { IApi } from '../interfaces/base.interface';
import { ICourse } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService {
  constructor() {
    super();
  }

  get(): Observable<IApi<ICourse[]>> {
    return this.makeGet('/curso');
  }

  find(id: number): Observable<IApi<ICourse>> {
    return this.makeGet(`/curso/${id}`);
  }
}
