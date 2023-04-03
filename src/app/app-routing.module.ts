import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { CustomPreloadStrategy } from './custom-peload-strategy.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './product/product.module';
import { AdminGuard } from './user/admin.guard';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    canActivate:[AuthGuard],
    data: { preload: true },
    loadChildren: () =>
      import('./product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'admin',
    canActivate:[AuthGuard, AdminGuard],
    data: { preload: false },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [
  HeaderComponent,
  HomeComponent
]
