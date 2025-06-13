import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AuthValidators{
    static passwordMatchValidator(): ValidatorFn {
      return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get('password');
        const confirmPassword = group.get('confirmPassword');
    
        if (!password || !confirmPassword) {
          return null;
        }
    
        const passwordsMatch = password.value === confirmPassword.value;
    
        return passwordsMatch ? null : { passwordMismatch: true };
      };
}
}