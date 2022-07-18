import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { UploadProductImageComponent } from './product/upload-product-image/upload-product-image.component';
import { ViewProductComponent } from './product/view-product/view-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products/manage' },
  { path: 'product/create', component: CreateProductComponent },
  { path: 'product/edit/:productId', component: EditProductComponent },
  { path: 'products/manage', component: ViewProductComponent }
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
];
