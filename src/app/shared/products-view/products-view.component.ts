import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { WishListItem } from 'src/app/models/wishlist';
import { WishListService } from 'src/app/service/wishlist.service';
import { ToastrService } from 'ngx-toastr';

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
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {}

  addWishList(item: Product) {
    const model: WishListItem = { productId: item.id };
    this.wishListService.CreateWishLists(model).subscribe({
      complete: () => {}, // completeHandler
      error: (errorRes: HttpErrorResponse) => {
        //we need to bind the error from API to UI.
        if (errorRes.status === 400) {
          this.toastr.info(
            `Product "${item.name.substring(
              0,
              15
            )}..." already added to your wishlist`
          );
        } else {
          this.toastr.error('Something went wrong');
        }
      }, // errorHandler
      next: () => {
        this.toastr.success(
          `Added product "${item.name.substring(0, 15)}..." to your wishlist`
        );
      },
    });

    this.wishListcount = this.wishListcount + 1;
    this.wishListCountChanged.emit(this.wishListcount);
  }

  getCategoryName(id: number): string {
    return this.categories.find((f) => f.id === id)?.name || '';
  }

  getShortenTitle(title: string): string {
    return `${title.substring(0, 50)}...`; // this is called template literal. We use back tick
  }
}
