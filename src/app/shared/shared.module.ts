import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductsViewComponent } from './products-view/products-view.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LabelErrorComponent } from './label-error/label-error.component';
import { DisplayErrorsComponent } from './display-errors/display-errors.component';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [SpinnerComponent, ProductsViewComponent, LabelErrorComponent, DisplayErrorsComponent], //we need to export this component because we will import this module inn other module
  declarations: [SpinnerComponent, ProductsViewComponent, LabelErrorComponent, DisplayErrorsComponent],
  providers: [],
})
export class SharedModule {}


/*
We learnt how to created Module/shared module and reuse components and we will see more examples
similar to shared module, we now create product module
*/