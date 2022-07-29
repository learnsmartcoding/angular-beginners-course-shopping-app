import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { WishListItem } from 'src/app/models/wishlist';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { WishListService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-products-view-filter',
  templateUrl: './products-view-filter.component.html',
  styleUrls: ['./products-view-filter.component.css'],
})
export class ProductsViewFilterComponent implements OnInit, OnChanges {
  wishListCount = 0;
  products!: Product[];
  filteredProducts!: Product[];

  @Input() categories: Category[] = [];

  selectedCategory = -1;
  searchFilter = '';

  @Output() onProductsFilterChanged = new EventEmitter<Product[]>();

  wishListItems!: WishListItem[];
  constructor(private productService: ProductService,
    private toastr: ToastrService,
    private wishListService: WishListService
    ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getWishList();
  }

  getWishList(){
    this.wishListService.GetWishLists().subscribe(s=>{
      this.wishListItems = s;
      this.wishListCount = s.length;
      this.toastr.info("Your wishlist has been updated","Wishlist updated");
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  getProducts() {
    this.productService.GetProducts().subscribe((s) => {
      this.products = s;
      this.publishFilteredProducts(this.products);
    });
  }

  categoryChanged(selectedCategory: string) {
    if (+selectedCategory === -1) {
      this.publishFilteredProducts(this.products);
    } else {
      this.filteredProducts = this.products.filter(
        (f) => f.categoryId === +selectedCategory
      );

      this.publishFilteredProducts(this.filteredProducts);
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
    this.publishFilteredProducts(searchFilteredProducts);
  }

  getTitle(title: string) {
    return `${title.substring(0, 50)}...`;
  }

  getCategory(categoryId: number) {
    return this.categories.find((f) => f.id == categoryId)?.name;
  }

  publishFilteredProducts(products: Product[]) {
    this.onProductsFilterChanged.emit(products);
  }
}
