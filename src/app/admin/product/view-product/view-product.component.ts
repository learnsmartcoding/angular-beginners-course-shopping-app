import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  products!: Product[];
  showSpinner = false; // this is for delete feature purpose
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    //this gives us the products that user owns. For now API returns newly created product but once we implement Authorization
    //it returns only what you created
    this.productService
      .GetProductsByOwner()
      .subscribe((s) => (this.products = s));
  }

  //all logic is same as create product
  deleteProduct(id: number) {
    this.productService.DeleteProduct(id).subscribe({
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

  onError(errorRes: HttpErrorResponse) {
    this.toastr.error('Something went wrong', 'Error');
    this.showSpinner = false;
  }
  onComplete() {
    this.toastr.info('Completed', 'Process Completed');
    this.showSpinner = false;
  }
  onSaveComplete() {
    this.toastr.success('Saved successfully', 'Success');
    this.getProducts();
  }
}
