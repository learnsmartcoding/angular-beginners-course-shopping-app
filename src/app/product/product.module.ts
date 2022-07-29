import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule, routedComponents } from './product-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';



@NgModule({
    imports: [CommonModule, FormsModule, ProductRoutingModule, SharedModule],
    exports: [],
    declarations: [routedComponents, WishlistComponent],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule { }
