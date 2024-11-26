import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged = new BehaviorSubject<boolean>(false);

  updateLogin(isLogged: boolean) {
    this.isLogged.next(isLogged);
  }
}
