import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private auth: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  is_auth = false;
  async canActivate(): Promise<boolean> {
    let Auth = this.auth.getStatus();
    // console.log(Auth)
    let is_auth = false;

    try {
      if (Auth) {
        is_auth = true;
        this.is_auth = is_auth;
      } else {
        this.router.navigate(['login']);
        is_auth = false;
      }
    } catch {
      this.router.navigate(['login']);
      is_auth = false;
    }

    return is_auth;
  }
}
