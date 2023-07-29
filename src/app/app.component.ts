import { Component } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Smoosh';

  constructor(private cookieService: CookieService){}

  getStatus(){
    return this.cookieService.check('login')
  }
}
