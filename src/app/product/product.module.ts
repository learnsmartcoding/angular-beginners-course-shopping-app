import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import {
  ProductRoutingModule,
  routedComponents,
} from './product-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule, ProductRoutingModule],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class ProductModule {}
