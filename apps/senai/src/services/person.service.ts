import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IApi } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService{

  constructor() {
    super();
  }

  find(id: number): Observable<IApi<any>> {
    return this.makeGet(`/aluno/${id}`);
  }

  create(data: any): Observable<IApi<any>> {
    return this.makePost('/aluno', data);
  }
}
