import { inject, Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { PositionService } from './position.service';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public courseService = inject(CourseService);
  public positionService = inject(PositionService);
  public personService = inject(PersonService);
}
