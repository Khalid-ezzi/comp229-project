import { Component, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileNavOpen = false;

  constructor(private auth:AuthService){}
  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  logout(){
    this.auth.logout()
  }

}
