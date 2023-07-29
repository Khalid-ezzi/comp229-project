import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  is_complete = false;
  is_error = false;
  is_Visibil = false;
  input_type = 'password';
  error_msg: any;

  email: any = new FormControl('', [Validators.required, Validators.email]);
  password: any = new FormControl('', Validators.required);

  constructor(
    private afAuth: AngularFireAuth,
    private cookies: CookieService,
    private router: Router,
    private auth: AuthService,
    private fireauth: AngularFireAuth
  ) {}

  ngOnInit(): void {}

  isFilled() {
    if (this.email.invalid || this.password.invalid) {
      return false;
    }
    return true;
  }

  goToLogin() {
    this.router.navigate(['/login']);
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

  register() {
    this.fireauth
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(
        (res) => {
          this.is_complete = true
        },
        (err) => {
          this.is_error = true
          this.error_msg = err.message;
        }
      );
  }
}
