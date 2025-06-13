import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive],
  providers: [],
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarContainer', { static: true }) navbarContainer!: ElementRef;
  router = inject(Router);
  authService = inject(AuthService);
  loginService = inject(LoginService);
  constructor() {}

  ngOnInit() {
    if (!localStorage.getItem('id')) {
      this.authService.currentUserSig.set(null);
    } else {
      this.loginService
        .getUserById(Number(localStorage.getItem('id')))
        .subscribe({
          next: (response) => {
            if (response) {
              this.authService.currentUserSig.set(response.data);
            }
          },
          error: (error) => {
            this.authService.currentUserSig.set(null);
            localStorage.removeItem('id');
            localStorage.removeItem('token');
          },
        });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.router.url === '/') {
      const navbarClassList = this.navbarContainer.nativeElement.classList;
      const number =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (number > 300) {
        navbarClassList.add('black-nav');
        navbarClassList.add('transition-04');
      } else {
        navbarClassList.remove('black-nav');
        navbarClassList.remove('transition-04');
      }
    }
  }

  logout() {
    this.loginService.logout(this.payload).subscribe();
    localStorage.setItem('token', '');
    localStorage.setItem('id', '');
    this.authService.currentUserSig.set(null);
    this.router.navigateByUrl('/');
  }

  scrollToTop(): void {
    window.scroll({
      top: 0,
    });
  }

  get payload() {
    return {
      email: this.authService.currentUserSig()?.email || '',
      token: localStorage.getItem('token') || '',
    };
  }
}
