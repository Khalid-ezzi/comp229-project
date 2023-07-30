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
  is_checked = false
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
    this.getRememberMeValue()
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

  createUserCookies(){
    this.cookies.set('username', this.email.value)
    this.cookies.set('password', this.password.value)
  }

  deleteUserCookies(){
    this.cookies.delete('username')
    this.cookies.delete('password')
  }

  getRememberMeValue(){
    let is_exist = this.cookies.check('username')
    if (is_exist) {
      let _email = this.cookies.get('username')
      let _password = this.cookies.get('password')
      this.is_checked = true
      this.email.setValue(_email)
      this.password.setValue(_password) 
    }
  }

  isRememberMe(){
    console.log(this.is_checked)
    return this.is_checked = !this.is_checked
  }

  submitRememberMe(){
    if (this.is_checked) {
      this.createUserCookies()
    }
    else if(!this.is_checked){
      let is_exist = this.cookies.check('username')
      if (is_exist) {
        this.deleteUserCookies()
      }
    }
  }

  login() {
    if (this.isFilled()) {
      this.afAuth.signInWithEmailAndPassword(this.email.value, this.password.value)
        .then((userCredential) => {
          this.cookies.set('login', 'true')
          this.submitRememberMe()
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
