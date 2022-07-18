import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { WishListItem } from 'src/app/models/wishlist';
import { ProductService } from 'src/app/service/product.service';
import { WishListService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-product-view-filter',
  templateUrl: './product-view-filter.component.html',
  styleUrls: ['./product-view-filter.component.css'],
})
export class ProductViewFilterComponent implements OnInit {
  @Input() categories: Category[] = [];
  products!: Product[];
  filteredProducts!: Product[];
  selectedCategory = -1;
  searchFilter = '';
  wishListCount = 0;

  wishListItems!: WishListItem[];

  @Output() onProductFilterChnaged = new EventEmitter<Product[]>();

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
  }

  getProducts() {
    this.productService.GetProducts().subscribe((s) => {
      this.products = s;
      this.onProductFilterChnaged.emit(this.products);
    });
  }

  categoryChanged(selectedCategory: string) {
    if (+selectedCategory === -1) {
      this.onProductFilterChnaged.emit(this.products);
    } else {
      this.filteredProducts = this.products.filter(
        (f) => f.categoryId === +selectedCategory
      );

      this.onProductFilterChnaged.emit(this.filteredProducts);
    }
  }

  searchChanged(data: string) {
    const secondFilterToApply =
      this.selectedCategory === -1 ? this.products : this.filteredProducts;
    const searchFilteredProducts = secondFilterToApply.filter(
      (f) =>
        f.name.includes(data) ||
        f.name.startsWith(data) ||
        f.name.endsWith(data)
    );
    this.onProductFilterChnaged.emit(searchFilteredProducts);
  }

  getWishList() {
    this.wishListService.GetWishLists().subscribe((s) => {
      this.wishListItems = s;
      this.wishListCount = s.length;
      this.toastr.info('Your wishlist has been updated', 'Wishlist updated');
    });
  }
}
