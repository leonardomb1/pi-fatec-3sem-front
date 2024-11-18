import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged = new BehaviorSubject<boolean>(true);

  updateLogin(isLogged: boolean) {
    this.isLogged.next(isLogged);
  }
}
