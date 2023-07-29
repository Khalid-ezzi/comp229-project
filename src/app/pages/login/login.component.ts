import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{


  email:any = new FormControl('',
    [Validators.required, Validators.email]
  );
  password:any = new FormControl('',
  Validators.required
);



  constructor(
    private afAuth: AngularFireAuth,
    private cookies:CookieService,
    private router: Router,
    private auth:AuthService
    ) { }

  ngOnInit(): void {
  }


  isFilled(){
    if (this.email.invalid || this.password.invalid) {
      return false
    }
    return true
  }


  login() {
    if (this.isFilled()) {
      // this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
      //   .then((userCredential) => {
      //     this.cookies.set('is_auth', 'true')
      //     this.router.navigate(['/']);
      //   })
      //   .catch((error) => {
      //     // Handle sign-in errors
      //     console.error(error);
      // });

     let x = this.auth.login(this.email.value, this.password.value)
     console.log(x)
    }
  }
}
