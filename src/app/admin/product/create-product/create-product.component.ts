import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
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
  public categories: Category[] = [];
  showSpinner = false;

  model!: Product;

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
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [
        CustomValidators.required(),
        CustomValidators.minLength(
          5,
          'Product name should be atleast of length 5'
        ),
        CustomValidators.maxLength(
          1000,
          'Product name should be maximum of length 1000'
        ),
      ]),
      descriptions: new FormControl(null, [
        CustomValidators.required(),
        CustomValidators.minLength(
          5,
          'Product description should be atleast of length 5'
        ),
        CustomValidators.maxLength(
          8000,
          'Product description should be maximum of length 8000'
        ),
      ]),
      price: new FormControl(null, [
        CustomValidators.greaterThan(4, 'Price should be minimum of $5'),
        CustomValidators.max(9000),
      ]),
      categoryId: new FormControl(-1, [CustomValidators.required()]),
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
    this.errors = [];
    validateAllFormFields(this.form);
    if (this.form.valid) {
      this.showSpinner = true;
      //will be tru only if all form property satisfies the validations
      const model = this.getModel();
      this.model = model;
      this.productService.CreateProduct(model).subscribe({
        complete: () => {
          this.onComplete();
        }, // completeHandler
        error: (errorRes: HttpErrorResponse) => {
          this.onError(errorRes);
        }, // errorHandler
        next: () => {
          this.onSaveComplete();
        }, // nextHandler
      });
    }
  }

  onError(errorRes: HttpErrorResponse) {
    //we need to bind the error from API to UI.
    this.errors = modelStateFormMapper(this.form, errorRes, {});
    if (errorRes.status === 400) {
      this.toastr.warning('Something went wrong', 'Data Validation');
    } else {
      this.toastr.error('Something went wrong', 'Error');
    }
    this.showSpinner = false;
  }
  onComplete() {
    this.toastr.info('Completed', 'Process Completed');
    this.showSpinner = false;
  }
  onSaveComplete() {
    this.toastr.success('Saved successfully', 'Success');
    this.form.reset();
  }

  getModel(): Product {
    const formValue = this.form.getRawValue();
    return <Product>{
      name: formValue.name,
      descriptions: formValue.descriptions,
      isActive: true,
      price: +formValue.price,
      categoryId: +formValue.categoryId,
      availableSince: formValue.availableSince,
    };
  }

  public control(name: string): AbstractControl | null {
    if (this.form.get(name)?.touched === true) {
      return this.form.get(name);
    }
    return null;
  }
}
