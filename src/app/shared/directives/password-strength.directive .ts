import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordStrength]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective, multi: true}]
})
export class PasswordStrengthDirective implements Validator {

  validate(control: AbstractControl): {[key: string]: any} | null {
    debugger;
    const value = control.value || '';
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    const passwordValid = hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
    return passwordValid ? null : { 'passwordStrength': true };
  }
}