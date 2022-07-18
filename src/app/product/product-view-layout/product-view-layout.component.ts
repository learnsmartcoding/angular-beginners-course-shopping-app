import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product-view-layout',
  templateUrl: './product-view-layout.component.html',
  styleUrls: ['./product-view-layout.component.css']
})
export class ProductViewLayoutComponent implements OnInit {
  products!:Product[];
  categories!: Category[];
    
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((s) => {
      this.categories = s;
    });
  }

  emittedProducts(products:Product[]){
    this.products = products;
  }
}
