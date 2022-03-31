import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor( private formBuilder: FormBuilder,
               private authSvc: AuthService, 
               private router: Router,
               private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)] ]
    })
  }

  get emailNoValido() {
    return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
  }
  get passNoValida() {
    return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password);
      if (user) {
        this.checkUserIsVerified(user);
        this.toastr.success('Please verify your email address', 'Successfully Registered!');
      }
      else{
        console.log('eeeeee');
        this.toastr.error('Apparently there is already an account with that email address', 'Existing email address!');
        
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