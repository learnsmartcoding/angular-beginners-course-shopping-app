import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { WishListItem } from '../models/wishlist';
import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { WishListService } from '../service/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  categories: Category[] = [];
  wishListItems!: WishListItem[];
  wishListProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  getProducts() {
    this.productService.GetProducts().subscribe((s) => {
      this.products = s;
      this.getWishList();
    });
  }

  
  getWishList() {
    this.wishListService.GetWishLists().subscribe((s) => {
      this.wishListItems = s;
      this.populateWishlistProducts();
    });
  }

  populateWishlistProducts() {    
    this.products.forEach((f) => {      
      const wishlistItem = this.wishListItems.find((d) => d.productId === f.id);
      if (wishlistItem) {
        let prodWishList: Product = f;
        this.wishListProducts.push(prodWishList);
      }
    });
  }

  getTitle(title: string) {
    return `${title.substring(0, 50)}...`;
  }

  getCategory(categoryId: number) {
    return this.categories.find((f) => f.id == categoryId)?.name;
  }
}
