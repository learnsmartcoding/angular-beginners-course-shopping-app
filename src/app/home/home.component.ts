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
  productList!: Product[]; //this will be undefined untill we assign the data. to avoid this error, we put ! telling
  // compiler that don't check this and in runtime we will assign data
  categories: Category[] = []; // This has no error because we declare and assign empty arrary  using  [].
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
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getProducts() {
    this.productService.GetProducts().subscribe((s)=>{
      this.productList = s;
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
    this.productList.forEach((f) => {      
      const wishlistItem = this.wishListItems.find((d) => d.productId === f.id);
      if (wishlistItem) {
        let prodWishList: Product = f;
        this.wishListProducts.push(prodWishList);
      }
    });
  }

  /*
  - We will learn in built directives along with the home component layout/contents
  1. We created models
  2. Now create some static data to render in home page for the products
  3. Let's learn directives now
  4 . Lets see how to bring spinner now
  5. Lets re use spinner using separate component. Later we will move to shared module.

  Let's integrate with real API using HTTP service
  let's see how to pass this data to other component using Input() 
  Next is routing and then will show you how to use Output()
  */
}
