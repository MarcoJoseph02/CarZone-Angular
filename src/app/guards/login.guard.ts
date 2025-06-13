import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const isUserAuthenticated = this.authService.isAuthenticated();
    if (route.routeConfig?.path === 'events' && !isUserAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    if (route.routeConfig?.path !== 'events' && isUserAuthenticated) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
