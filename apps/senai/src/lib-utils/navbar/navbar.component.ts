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
  buttonsNavigations = [
    {
      label: 'Home',
      active: true,
      route: '/home',
    },
    {
      label: 'Cursos',
      active: false,
      route: '/courses',
    },
  ];


  // {
  //   label: 'Sobre nós',
  //   active: false,
  //   route: '',
  // },
  // {
  //   label: 'Contato',
  //   active: false,
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
