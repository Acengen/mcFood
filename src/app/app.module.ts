import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { ProductService } from './Services/product.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingService } from './Services/shopping.service';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/AuthGuard.service';
import { FakeAuth } from './Auth/FakeAuth.service';
import { CanDeactivateGuard } from './shopping-list/canDeactivateGuard/canDeactivate.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AboutComponent } from './about/about.component';
import { StartComponentComponent } from './products/start-component/start-component.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/burgers',
    pathMatch: 'full',
  },
  {
    path: 'burgers',
    component: ProductsComponent,
    children: [
      { path: '', component: StartComponentComponent },

      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent },
    ],
  },
  {
    path: 'ingredients',
    component: ShoppingListComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'page-not-found',
    component: ErrorMessageComponent,
    data: { message: 'Page Dont exist' },
  },
  { path: '**', redirectTo: '/page-not-found' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ShoppingListComponent,
    ErrorMessageComponent,
    AboutComponent,
    StartComponentComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductService,
    ShoppingService,
    AuthGuard,
    FakeAuth,
    CanDeactivateGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
