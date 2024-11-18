import { Component, inject, OnInit, signal } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  loginService = inject(LoginService);

  isLogged = signal<boolean>(false);
  showUserMenu = signal<boolean>(false);
  buttonsNavigations = [
    {
      label: 'Home',
      active: true,
    },
    {
      label: 'Cursos',
      active: false,
    },
    {
      label: 'Sobre nós',
      active: false,
    },
    {
      label: 'Contato',
      active: false,
    },
  ];

  ngOnInit(): void {
    this.isLogged.set(this.loginService.isLogged.value);
  }
}
