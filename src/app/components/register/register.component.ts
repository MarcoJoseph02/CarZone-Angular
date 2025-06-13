import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../models/user.model';
import { AuthValidators } from '../../validators/auth.validators';
import { FormErrorsComponent } from '../form-errors/form-errors.component';
import { FormService } from '../../services/form.service';
import { tap } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, FormErrorsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  registerFormErrors: { [key: string]: string } = {};

  states = [
    { name: 'Cairo', code: 'C' },
    { name: 'Alexandria', code: 'ALX' },
    { name: 'Giza', code: 'GZ' },
    { name: 'Aswan', code: 'ASN' },
    { name: 'Asyut', code: 'AST' },
    { name: 'Beheira', code: 'BH' },
    { name: 'Beni Suef', code: 'BNS' },
    { name: 'Dakahlia', code: 'DK' },
    { name: 'Damietta', code: 'DT' },
    { name: 'Faiyum', code: 'FYM' },
    { name: 'Gharbia', code: 'GH' },
    { name: 'Ismailia', code: 'IS' },
    { name: 'Kafr El Sheikh', code: 'KFS' },
    { name: 'Luxor', code: 'LX' },
    { name: 'Matrouh', code: 'MT' },
    { name: 'Minya', code: 'MN' },
    { name: 'Monufia', code: 'MNF' },
    { name: 'New Valley', code: 'WAD' },
    { name: 'North Sinai', code: 'SIN' },
    { name: 'Port Said', code: 'PTS' },
    { name: 'Qalyubia', code: 'KB' },
    { name: 'Qena', code: 'KN' },
    { name: 'Red Sea', code: 'BA' },
    { name: 'Sharqia', code: 'SHR' },
    { name: 'Sohag', code: 'SHG' },
    { name: 'South Sinai', code: 'JS' },
    { name: 'Suez', code: 'SUZ' },
  ];

  registerForm = this.fb.group({
    fname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
    ],
    lname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
    ],
    email: ['', [Validators.required, Validators.email]],
    passwordGroup: this.fb.group({
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
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
          ),
        ],
      ],
    }),
    phoneNo: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(13)],
    ],
    address: ['', [Validators.required]],
    state: ['', [Validators.required]],
  });

  uiNames = {
    fname: 'First Name',
    lname: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phoneNo: 'Phone Number',
    address: 'Address',
    state: 'State',
  };

  emailOrPhoneTaken = false;

  constructor() {}

  ngOnInit() {
    this.initPasswordGroupValidations();
  }

  public register() {
    this.registerFormErrors = this.formService.formErrors(
      this.registerForm,
      this.uiNames
    );

    if (this.registerForm.value && this.registerForm.valid) {
      this.loginService
        .register(this.payload)
        .pipe(
          tap((response) => {
            if (response) {
              this.router.navigateByUrl('/login');
            }
          })
        )
        .subscribe({
          next: () => {},
          error: (error) => {
            console.log(error);
            if (error.error.errors.email || error.errors.phone_no) {
              this.emailOrPhoneTaken = true;
            } else {
              console.log('unexpected error happened in register API');
            }
          },
        });
    }
  }

  get payload(): UserRegister {
    return {
      fname: this.registerForm.value.fname || '',
      lname: this.registerForm.value.lname || '',
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.passwordGroup?.password || '',
      phone_no: this.registerForm.value.phoneNo?.replaceAll(' ', '') || '',
      address:
        this.registerForm.value.address +
          ', ' +
          this.registerForm.value.state || '',
    };
  }

  get passwordGroup() {
    return this.registerForm.get('passwordGroup') as FormGroup;
  }

  public updatePhoneValue(event: KeyboardEvent) {
    const reg = /^\d+$/;
    const input = event.key;
    const phone = this.registerForm.value.phoneNo;

    if (phone && phone[0] !== '0') {
      this.registerForm.controls.phoneNo.setErrors({ startWithZero: true });
      event.preventDefault();
    }

    if (!reg.test(input) || (input !== '0' && phone?.length === 0)) {
      event.preventDefault();
    }

    if (phone?.length === 3) {
      this.registerForm.patchValue({ phoneNo: phone + ' ' });
    }
    if (phone?.length === 8) {
      this.registerForm.patchValue({ phoneNo: phone + ' ' });
    }
  }

  initPasswordGroupValidations() {
    this.registerForm
      .get('passwordGroup')
      ?.setValidators([
        Validators.required,
        AuthValidators.passwordMatchValidator(),
      ]);
  }

  get formHasErrors() {
    return Object.keys(this.registerFormErrors).length > 0;
  }

  onCloseErrors(): void {
    this.registerFormErrors = {};
  }
}
