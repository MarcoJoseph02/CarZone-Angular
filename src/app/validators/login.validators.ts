import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class LoginValidators {
  static passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.parent?.get('password');
      const confirmPassword = control.parent?.get('confirmPassword');

      if (!password || !confirmPassword) {
        return null;
      }

      const passwordsMatch = password.value === confirmPassword.value;

      return passwordsMatch ? null : { passwordMismatch: true };
    };
  }
}
