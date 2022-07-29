import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule, routedComponents } from "./admin-routing.module";
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { UploadProductImageComponent } from './product/upload-product-image/upload-product-image.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      AdminRoutingModule,
      ReactiveFormsModule,     
      SharedModule
    ],
    exports: [],
    declarations: [routedComponents],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class AdminModule {}