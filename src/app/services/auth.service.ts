import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 
  constructor(
    private fireauth : AngularFireAuth,
    private router : Router,
    private cookieService: CookieService,
    ) { 

  }

   // login method
   login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        this.cookieService.set('login', 'true')
        this.router.navigate(['/']);

    }, err => {
        // console.log(err.message)
        return err.message;
    })
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

    // sign out
logout() {
  this.fireauth.signOut().then( () => {
    this.cookieService.delete('login')
    this.router.navigate(['/login']);
  }, err => {
    alert(err.message);
  })
}

// forgot password
forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
}

// email varification
sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/varify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}

getStatus(){
  let status: boolean = this.cookieService.check('login')

  if (status) {
      return status
  }
  return false
}

}

   

