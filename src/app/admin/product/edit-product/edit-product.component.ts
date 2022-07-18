import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { ProductImages, Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { CustomValidators } from 'src/app/service/custom-validators';
import { modelStateFormMapper } from 'src/app/service/modelStateFormMapper';
import { ProductService } from 'src/app/service/product.service';
import { validateAllFormFields } from 'src/app/service/validateAllFormFields';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  /*
  Create and Edit components are almost same except 2 difference. 
  For edit we need take the route param and find out the product id and then fetch that product details to load
  once we have data, we patch existing form. so upon save instead of calling create we call update

  */
  selectedPhoto!: ProductImages;
  productId!: number;
  errors: string[] = [];
  public form!: FormGroup;
  public categories: Category[] = [];
  showSpinner = false;
  existingProduct!: Product;
  model!: Product;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute, // we fetch route param from this service
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.form = this.buildForm();
    const routedParams = this.route.snapshot.paramMap;
    this.productId = Number(routedParams.get('productId'));
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
      this.getProductDetails();
    });
  }

  getProductDetails() {
    this.productService.GetProduct(this.productId).subscribe((data) => {
      //now we should call patch method to patch the existing form
      this.patchProduct(data);
      this.existingProduct = data;
      this.selectedPhoto = data.productImages[0];
    });
  }

  private patchProduct(product: Product) {
    this.control('name')?.patchValue(product.name);
    this.control('descriptions')?.patchValue(product.descriptions);
    this.control('isActive')?.patchValue(product.isActive);
    this.control('categoryId')?.patchValue(product.categoryId);
    this.control('availableSince')?.patchValue(
      new Date(product.availableSince).toISOString().slice(0, 10)
    );
    this.control('price')?.patchValue(product.price);
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(-1),
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
      this.productService.UpdateProduct(model).subscribe({
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
  }

  getModel(): Product {
    const formValue = this.form.getRawValue();
    return <Product>{
      id: this.existingProduct.id,
      name: formValue.name,
      descriptions: formValue.descriptions,
      isActive: true,
      price: +formValue.price,
      categoryId: +formValue.categoryId,
      availableSince: formValue.availableSince,
    };
  }

  public control(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  //we use this method to hold the selected image from many images we have for product
  setSelectedImage(image: ProductImages) {
    this.selectedPhoto = image;
  }

  imageUploadCompleted(isSuccess: boolean) {
    if (isSuccess) {
      this.getProductDetails(); //refresh product data to get new uploaded image
    } else {
      this.toastr.warning(
        'Something went wrong while we processed your upload request',
        'upload image failed'
      );
    }
  }
}
