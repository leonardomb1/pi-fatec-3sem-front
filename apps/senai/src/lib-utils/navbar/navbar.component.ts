import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
  showButtonsMenu = signal<boolean>(false);
  buttonsNavigations = [
    {
      label: 'Home',
      route: '/home',
    },
    {
      label: 'Cursos',
      route: '/courses',
    },
  ];

  // {
  //   label: 'Sobre nós',
  //   route: '',
  // },
  // {
  //   label: 'Contato',
  //   route: '',
  // },

  ngOnInit(): void {
    this.isLogged.set(this.loginService.isLogged.value);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const clickedInside = event.target instanceof HTMLElement && !!event.target.closest('.menu');

    if (!clickedInside) {
      this.showUserMenu.set(false)
    }
  }
}
