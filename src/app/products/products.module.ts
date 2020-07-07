import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { StartComponentComponent } from './start-component/start-component.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BoughtProductsComponent } from './bought-products/bought-products.component';


const route: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            { path: '', component: StartComponentComponent },
            { path: ':id', component: ProductDetailComponent },
            { path: ':id/edit', component: ProductEditComponent },
        ],
    },
]

@NgModule({
    declarations: [
        ProductsComponent,
        ProductItemComponent,
        ProductDetailComponent,
        ProductEditComponent,
        StartComponentComponent,
        BoughtProductsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ProductsComponent,
        ProductItemComponent,
        ProductDetailComponent,
        ProductEditComponent,
        StartComponentComponent,
        BoughtProductsComponent,
    ]
})

export class ProductModule { }