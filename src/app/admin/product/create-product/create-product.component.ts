import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { CustomValidators } from 'src/app/service/custom-validators';
import { modelStateFormMapper } from 'src/app/service/modelStateFormMapper';
import { ProductService } from 'src/app/service/product.service';
import { validateAllFormFields } from 'src/app/service/validateAllFormFields';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  errors: string[] = [];
  public form!: FormGroup;
  categories: Category[] = [];
  showSpinner = false;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.buildForm();
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe((s) => (this.categories = s));
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, [
        CustomValidators.required('Name of the product is required'),
        CustomValidators.minLength(
          2,
          'Product name should be atleast of length 5'
        ),
        CustomValidators.maxLength(
          1000,
          'Product name should be maximum of length 1000'
        ),
      ]),
      descriptions: new FormControl(null, [
        //this is one way but let's see how to handle from API error to UI
        CustomValidators.required(),
        CustomValidators.minLength(
          5,
          'Product description should be atleast of length 100'
        ),
        CustomValidators.maxLength(
          8000,
          'Product description should be maximum of length 8000'
        ),
      ]),
      price: new FormControl(null, [
        CustomValidators.greaterThan(2, 'Price should be minimum of $5'),
        CustomValidators.max(9000),
      ]),
      categoryId: new FormControl(-1, [
        CustomValidators.required(),
        CustomValidators.min(1, 'Select category for the product'),
      ]),
      availableSince: new FormControl(new Date().toISOString().slice(0, 10), [
        CustomValidators.required(),
      ]),
      isActive: new FormControl(true),
    });
  }

  onSubmit() {
    this.saveProduct();
  }
  saveProduct() {
    validateAllFormFields(this.form);
    if (this.form.valid) {
      const model = this.getModel();
      this.showSpinner = true;
      this.productService.CreateProduct(model).subscribe({
        complete: () => {
          this.onComplete(); //call this method when call is completed
        },
        error: (errorRes: HttpErrorResponse) => {
          this.onError(errorRes);
        },
        next: () => {
          this.onSaveComplete();
        },
      });
    }
  }
  onSaveComplete() {
    this.toastr.success('Saved successfully', 'Success');
    this.form.reset();
    this.showSpinner = false;
  }
  onError(errorRes: HttpErrorResponse) {
    this.errors = modelStateFormMapper(this.form, errorRes, {});
    if (errorRes.status === 400) {
      //this is 400 error and can be corrected
      this.toastr.warning('Something went wrong', 'Data Validation');
    } else {
      this.toastr.error('Something went wrong', 'Error');
    }
    this.showSpinner = false;
  }

  onComplete() {
    this.toastr.info('Completed', 'Process Completed');
  }

  getModel(): Product {
    const formValue = this.form.getRawValue();
    return <Product>{
      name: formValue.name,
      descriptions: formValue.descriptions,
      isActive: true,
      price: +formValue.price, //+ will convert string to number
      categoryId: +formValue.categoryId,
      availableSince: formValue.availableSince,
    };
  }

  //This will help us to get error details of a particular form control
  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }
}

/*
So what happened? 
We sent request but got 400 bad request. 400 bad request means request has invalid data to process
we got three errors. Name, Description and Price properties.
So if we have validations here in UI we can avoid such thing.
Let's build validations using Reactive forms
and then I will show how to add custom validations

*/
