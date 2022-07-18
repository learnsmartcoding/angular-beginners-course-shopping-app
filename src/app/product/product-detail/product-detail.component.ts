import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product, ProductImages } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product!: Product;
  categories!: Category[];
  aboutThisItem: string[] = []; //we will split the descriptions into many points using period as separator
  selectedPhoto!: ProductImages;
  filteredProducts!: Product[];
  products!: Product[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute // this provides us to fetch the route details
  ) {}

  ngOnInit(): void {
    //we need to retrieve the product id from route
    //this.productId = Number(this.route.snapshot.paramMap.get('productId')); // we convert to number
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('productId'));
      this.getProductDetails();
    });
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.productService.GetProducts().subscribe((s) => {
      this.products = s;
      this.filterSimilarItems();
    });
  }

  getProductDetails() {
    this.productService.GetProduct(this.productId).subscribe((data) => {
      this.product = data; //With this data we can build one by one section, we will also see how to use pipes
      this.aboutThisItem = data.descriptions.trim().split('.');
      this.selectedPhoto = data.productImages[0];
    });
  }

  getCategory(id: number) {
    //we have category id and we need name, let's fetch all category first
    return this.categories.find((f) => f.id === id)?.name;
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }
  setSelectedImage(image: ProductImages) {
    this.selectedPhoto = image;
  }

  filterSimilarItems() {
    this.filteredProducts = this.products?.filter(
      (f) =>
        f.categoryId === this.product?.categoryId && f?.id !== this.product.id
    );
  }
}

//Next is we filter the products of same category of current product
//TODO: Those two buttongs with Add Wishlist and Add cart you can implemet similar to how I did in products page
//it is good to practice hence leavig it for you guys to practice.