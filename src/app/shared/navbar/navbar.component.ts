import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileNavOpen = false;

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  // Close the mobile navigation if the user clicks outside of it
  // @HostListener('document:click', ['$event'])
  // closeMobileNav(event: Event) {
  //   if (
  //     this.isMobileNavOpen &&
  //     !(event.target as HTMLElement).closest('.mobile-nav-trigger')
  //   ) {
  //     this.isMobileNavOpen = false;
  //   }
  // }
}
