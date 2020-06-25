import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/product.model';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { FakeAuth } from '../Auth/FakeAuth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[];
  totalPrice: number;

  selectedProduct: Product;
  loginMsg: string;
  auth: boolean;
  buyProduct: Product[]


  constructor(
    private productService: ProductService,
    private router: Router,
    private fakeAuth: FakeAuth,

  ) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.buyProduct = this.productService.getBuyProduc();
    this.totalPrice = this.productService.total;

    this.productService.productTotalPriceEmitter.subscribe(
      (total: number) => {
        this.totalPrice = total
      }
    )
    this.productService.productChanged.subscribe(
      (product: Product[]) => {
        this.products = product;
      }
    )

    this.productService.productToBuyEmitter.subscribe(
      (product: Product[]) => {
        this.buyProduct = product;
      }
    )
    this.auth = this.fakeAuth.auth;
    this.fakeAuth.authEmitter.subscribe((auth: boolean) => {
      this.auth = auth;

    });
    this.productService.productSelected.subscribe((products: Product) => {
      this.selectedProduct = products;
    });

    this.loginMsg = this.fakeAuth.loginMsg;
    this.fakeAuth.loginEmitter.subscribe((logMsg: string) => {
      this.loginMsg = logMsg;
    });
    this.fakeAuth.setTimeoutEmitter.subscribe((emptyMsg: string) => {
      this.loginMsg = emptyMsg;
    });
  }

  login() {
    this.fakeAuth.login();
  }
}
