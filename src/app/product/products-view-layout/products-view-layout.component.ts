import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-products-view-layout',
  templateUrl: './products-view-layout.component.html',
  styleUrls: ['./products-view-layout.component.css'],
})
export class ProductsViewLayoutComponent implements OnInit {
  products!: Product[];
  categories!: Category[];
    
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  emittedProducts(products: Product[]) {
    this.products = products;
  }
  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  
}
