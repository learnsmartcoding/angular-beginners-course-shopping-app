import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { WishListItem } from 'src/app/models/wishlist';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { WishListService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css'],
})
export class ProductsViewComponent implements OnInit {
  @Input() products!: Product[];
  @Input() categories!: Category[];

  wishListcount = 0;
  @Output() wishListCountChanged = new EventEmitter<number>();

  constructor(
    private toastr: ToastrService,
    private wishListService: WishListService, 
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}


  addWishList(item: Product) {
    this.localStorageService.addToCart(item);
    const model: WishListItem = { productId: item.id };
    this.wishListService.CreateWishLists(model).subscribe(
      (s) => {
        this.toastr.success(
          `Added product "${item.name.substring(0, 15)}..." to your wishlist`
        );
      },
      (errorRes: HttpErrorResponse) => {
        //we need to bind the error from API to UI.
        if (errorRes.status === 400) {
          this.toastr.info(
            `Product "${item.name.substring(
              0,
              15
            )}..." already added to your wishlist`
          );
        } else {
          this.toastr.error('Something went wrong', 'Error');
        }
      },
      () => {}
    );
    this.wishListcount = this.wishListcount + 1;
    this.wishListCountChanged.emit(this.wishListcount);
  }

  getTitle(title: string) {
    return `${title.substring(0, 60)}...`;
  }

  getCategory(categoryId: number) {
    return this.categories.find((f) => f.id == categoryId)?.name;
  }
}
