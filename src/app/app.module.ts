import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { ProductService } from './Services/product.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingService } from './Services/shopping.service';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './Auth/AuthGuard.service';
import { FakeAuth } from './Auth/FakeAuth.service';
import { CanDeactivateGuard } from './shopping-list/canDeactivateGuard/canDeactivate.service';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/burgers',
    pathMatch: 'full',
  },
  { path: '', component: HomeComponentComponent },
  { path: 'burgers', loadChildren: () => import('./products/products.module').then(m => m.ProductModule) },
  {
    path: 'ingredients',
    component: ShoppingListComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'validate', loadChildren: () => import('./form-validation/form.module').then(m => m.ValidationsModule) },
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
    ShoppingListComponent,
    ErrorMessageComponent,
    HomeComponentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
export class AppModule { }
