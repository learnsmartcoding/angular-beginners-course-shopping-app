import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateGuard } from '../core/guards/product-can-activate.guard';
import { CanComponentDeactivateGuard } from '../core/guards/product-deactivate.guard';

import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { UploadProductImageModelComponent } from './product/upload-product-image-model/upload-product-image-model.component';
import { UploadProductImageComponent } from './product/upload-product-image/upload-product-image.component';
import { ViewProductComponent } from './product/view-product/view-product.component';

const routes: Routes = [
  {
    path: 'product/create',
    component: CreateProductComponent,
    canActivate: [ProductCreateGuard],
    canDeactivate:[CanComponentDeactivateGuard]
  },
  {
    path: 'product/edit/:productId',
    component: EditProductComponent,
    canActivate: [ProductCreateGuard],
    canDeactivate:[CanComponentDeactivateGuard]
  },
  { path: 'products/manage', component: ViewProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

export const routedComponents = [
  CreateProductComponent,
  EditProductComponent,
  ViewProductComponent,
  UploadProductImageComponent,
  UploadProductImageModelComponent
];
