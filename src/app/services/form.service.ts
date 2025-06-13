import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  public formErrors(form: FormGroup, uiNames?: any): { [key: string]: string } {
    const errors: { [key: string]: string } = {};
    if (form.invalid) {
      Object.keys(form.controls).forEach((key) => {
        const control = form.get(key);
        if (control instanceof FormGroup) {
          const groupErrors = this.formErrors(control, uiNames);
          if (Object.keys(groupErrors).length > 0) {
            Object.keys(groupErrors).forEach((groupKey) => {
              errors[groupKey] = groupErrors[groupKey];
            });
          }
        }
        if (control && control.invalid) {
          uiNames && uiNames[key]
            ? (errors[key] = this.getErrorMessage(control, uiNames[key]))
            : (errors[key] = this.getErrorMessage(control, key));
        }
      });
    }
    return errors;
  }

  private getErrorMessage(
    control: AbstractControl,
    controlName?: string
  ): string {
    if (control.errors?.['required']) {
      return `${controlName} is required`;
    }
    if (control.errors?.['minlength']) {
      return `Minimum length for ${controlName} is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    if (control.errors?.['maxlength']) {
      return `Maximum length for ${controlName} is ${control.errors?.['maxlength'].requiredLength} characters`;
    }
    if (control.errors?.['email']) {
      return 'Invalid email format';
    }
    if (control.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    if (control.errors?.['pattern']) {
      if(control.errors?.['pattern'].requiredPattern ===
        '/^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$/'){
          return `${controlName} should include 1 capital letter, small letter, number, symbol, and be from 8 to 16 characters without spaces`;
        }else{
          return `Invalid format for ${controlName}`;
        }
    }
    if (control.errors?.['startWithZero']) {
      return `${controlName} should start with 0`;
    }
    return '';
  }
}
