import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth.service';
import {
  UserForgotPassword,
  UserLogin,
  UserResetPassword,
} from '../../models/user.model';
import { AuthValidators } from '../../validators/auth.validators';
import { LoginValidators } from '../../validators/login.validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, FontAwesomeModule, RouterLink, CommonModule],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  restoreAccountForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  resetPasswordForm = this.fb.group({
    otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
        ),
      ],
    ],
    confirmPassword: [
      '',
      [Validators.required, LoginValidators.passwordMatchValidator()],
    ],
  });

  faGoogle = faGoogle;
  faApple = faApple;
  faEnvelope = faEnvelope;
  faLock = faLock;

  forgotBtnTitle = 'Forgot Password';
  resetPasswordMode = false;
  restoreAccountMode = false;
  wrongOTP = false;
  resetSuccess = false;
  loginError = false;

  constructor() {}

  ngOnInit() {}

  login() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.loginService
        .login(this.payload)
        .pipe(
          tap((response) => {
            if (response) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id', response.data.id.toString());
              this.authService.currentUserSig.set(response.data);
              this.router.navigateByUrl('/');
            }
          })
        )
        .subscribe({
          error: (err) => {
            if (err.error.error === 'Unauthorized') {
              this.loginError = true;
            } else {
              console.log('Unknown error happened while calling Login API');
            }
          },
        });
    }
  }

  get payload(): UserLogin {
    return {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };
  }

  get resetPayload(): UserResetPassword {
    return {
      otp: this.resetPasswordForm.value.otp || '',
      password: this.resetPasswordForm.value.password || '',
      password_confirmation: this.resetPasswordForm.value.confirmPassword || '',
      email: this.restoreAccountForm.value.email || '',
    };
  }

  toggleFormView(mode: string) {
    this.currentForm().touched = true;
    if (mode === 'reset') {
      this.forgotBtnTitle = 'Restore Account';
      this.resetPasswordMode = false;
      this.restoreAccountMode = true;
    }
    if (mode === 'forget' && this.currentForm().valid) {
      this.loginService
        .forgotPassword(this.currentForm().value as UserForgotPassword)
        .subscribe();
      this.forgotBtnTitle = 'Reset Password';
      this.resetPasswordMode = true;
      this.restoreAccountMode = false;
      this.wrongOTP = false;
    }
    if (mode === 'login' && this.currentForm().valid) {
      this.loginService.resetPassword(this.resetPayload).subscribe({
        next: () => {
          this.forgotBtnTitle = 'Forget Password';
          this.resetPasswordMode = false;
          this.restoreAccountMode = false;
          this.wrongOTP = false;
          this.resetSuccess = true;
        },
        error: (error) => {
          if (error.error.message === 'Invalid otp') {
            this.wrongOTP = true;
          } else {
            console.log('some error happened in resetPassword API call');
          }
        },
      });
    }
    if (mode === 'cancel') {
      this.forgotBtnTitle = 'Forget Password';
      this.resetPasswordMode = false;
      this.restoreAccountMode = false;
      this.wrongOTP = false;
    }
  }

  currentForm(): any {
    if (this.restoreAccountMode) {
      return this.restoreAccountForm;
    } else if (this.resetPasswordMode) {
      return this.resetPasswordForm;
    } else {
      return this.loginForm;
    }
  }
}
