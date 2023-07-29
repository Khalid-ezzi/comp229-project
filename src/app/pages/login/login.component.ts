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

  is_error = false;
  error_msg: any;
  is_Visibil = false;
  input_type = 'password';

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


  changeErrorView() {
    this.is_error = !this.is_error;
  }

  passwordView() {
    this.is_Visibil = !this.is_Visibil;

    if (this.is_Visibil) {
      this.input_type = 'text';
    } else {
      this.input_type = 'password';
    }
  }

  isFilled(){
    if (this.email.invalid || this.password.invalid) {
      return false
    }
    return true
  }


  login() {
    if (this.isFilled()) {
      this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
        .then((userCredential) => {
          this.cookies.set('login', 'true')
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.is_error = true
          this.error_msg = error.message;
          console.error(error);
      });
    }
  }
}
