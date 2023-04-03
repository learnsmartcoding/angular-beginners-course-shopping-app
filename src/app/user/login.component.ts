import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { CustomValidators } from '../service/custom-validators';
import { modelStateFormMapper } from '../service/modelStateFormMapper';
import { validateAllFormFields } from '../service/validateAllFormFields';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  errors: string[] = [];
  public form!: FormGroup;
  errorMessage!: string;
  pageTitle = 'Log In';

  constructor(private authService: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    this.form = this.buildForm();
  }


  private buildForm(): FormGroup {
    const categoryControl = new FormControl(-1, [
      CustomValidators.required(),
      CustomValidators.min(1, 'Select a category for the product'),
    ]);

    

    return new FormGroup({
      userName: new FormControl(null, [
        CustomValidators.required()
      ]),
      password: new FormControl(null, [
        CustomValidators.required()        
      ])
    });
  }

  onSubmit() {
    this.process();
  }

  process() {
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      const userName = formValue.userName;
      const password = formValue.password;
      this.authService.login(userName, password);

      // Navigate to the Product List page after log in.
      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    }
  }


  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }

  public isFormDirty(): boolean {
    return this.form.dirty || this.form.touched;
  }

}
