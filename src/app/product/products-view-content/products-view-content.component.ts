import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-view-content',
  templateUrl: './products-view-content.component.html',
  styleUrls: ['./products-view-content.component.css'],
})
export class ProductsViewContentComponent implements OnInit {
  @Input() filteredProducts!: Product[];
  @Input() categories: Category[] = [];

  constructor() {}
  ngOnInit(): void {}

  
}
