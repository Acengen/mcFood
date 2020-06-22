import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.product = this.productService.getProductById(this.id);
    });
  }

  addToShoppingList() {
    this.productService.passIngredientToShoppingList(this.product.ingredient);
    this.router.navigate(['/ingredients']);
  }
  goToEdit() {
    this.router.navigate(['/burgers', this.id, 'edit']);
  }
}
