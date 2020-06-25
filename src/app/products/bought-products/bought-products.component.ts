import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-bought-products',
  templateUrl: './bought-products.component.html',
  styleUrls: ['./bought-products.component.css']
})
export class BoughtProductsComponent implements OnInit {
  @Input() boughtProducts: Product;
  @Input() index: number;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  deleteBurgerFromCart(index: number) {
    this.productService.deletingBurger(index, this.boughtProducts)
  }

}
