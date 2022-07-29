import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsViewContentComponent } from './products-view-content/products-view-content.component';
import { ProductsViewFilterComponent } from './products-view-filter/products-view-filter.component';
import { ProductsViewLayoutComponent } from './products-view-layout/products-view-layout.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: '', component: ProductsViewLayoutComponent },
  { path: 'detail/:productId', component: ProductDetailComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

export const routedComponents = [
  ProductsViewLayoutComponent,
  ProductDetailComponent,
  ProductsViewFilterComponent,
  ProductsViewContentComponent,
  WishlistComponent
];
