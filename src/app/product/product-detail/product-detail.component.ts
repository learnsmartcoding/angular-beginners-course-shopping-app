import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product, ProductImages } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productId!: number;
  selectedPhoto!: ProductImages;
  aboutThisItem: string[] = [];
  categories!: Category[];
  products!: Product[];
  filteredProducts!: Product[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    
    //this.productId = Number(this.route.snapshot.paramMap.get('productId')); //TODO subscribe to get route change    
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

  getCategory(categoryId: number) {
    return this.categories.find((f) => f.id == categoryId)?.name;
  }
  
  filterSimilarItems() {
    this.filteredProducts = this.products?.filter(
      (f) =>
        f.categoryId === this.product?.categoryId && f?.id !== this.product.id
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  getProductDetails() {
    this.productService.GetProduct(this.productId).subscribe((s) => {
      this.product = s;
      this.titleService.setTitle(`Product details | ${this.product.name} | Show Essential Products | Learn Smart Coding `);
      this.selectedPhoto = this.product.productImages[0];
      this.aboutThisItem = this.product.descriptions.trim().split('.');
      this.filterSimilarItems();
    });
  }

  setSelectedImage(image: ProductImages) {
    this.selectedPhoto = image;
  }
}
