import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductWishlist } from 'src/app/models/product';
import { WishListItem } from 'src/app/models/wishlist';
import { ProductService } from 'src/app/service/product.service';
import { WishListService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  wishListItems!: WishListItem[];
  products!: Product[];
  filteredProducts!: ProductWishlist[];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getWishList() {
    this.wishListService.GetWishLists().subscribe((s) => {
      this.wishListItems = s;
      this.populateWishlistProducts();
    });
  }

  getProducts() {
    this.productService.GetProducts().subscribe((s) => {
      this.products = s;
      this.getWishList();
    });
  }

  populateWishlistProducts() {
    this.filteredProducts = [];
    this.products.forEach((f) => {
      
      const wishlistItem = this.wishListItems.find((d) => d.productId === f.id);
      if (wishlistItem) {
        let prodWishList: ProductWishlist = <ProductWishlist>f;
        prodWishList.wishlistId = Number(wishlistItem.id);
        this.filteredProducts.push(prodWishList);
      }
    });
  }

  deleteWishlist(id: number) {
    this.wishListService.DeleteWishList(id).subscribe(
      (model) => {
        this.getWishList();
        this.toastr.success('Success', 'Successfully deleted');
      },
      (errorRes: HttpErrorResponse) => {
        this.toastr.error('Error', 'Something went wrong');
      },
      () => {}
    );
  }
}
