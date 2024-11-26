import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PositionService extends BaseService {
  constructor() {
    super();
  }

  get(): Observable<any> {
    return this.makeGet('/cargo');
  }
}
