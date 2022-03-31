import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../shared/models/user.interface';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor( private formBuilder: FormBuilder,
               private _authSvc: AuthService, 
               private router: Router,
               private toastr: ToastrService ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)] ]
    })
  }

  get emailNoValido() {
    return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
  }
  get passNoValida() {
    return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
  }

  async onGoogleLogin() {
    try {
      const user = await this._authSvc.loginGoogle();
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      const user = await this._authSvc.login(email, password);
      
      if (user) {
        this.checkUserIsVerified(user);
      }
      else {
        this.toastr.error('The username or password is incorrect', 'Error to Authenticate!');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {      
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}