import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { rejects } from 'assert';
import { ProductService } from '../Services/product.service';
import { Product } from '../Models/product.model';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  signinForm: FormGroup;
  boughtProducts: Product[]
  submitMode = false
  user = {
    name: '',
    email: '',
    select: ''
  }
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.boughtProducts = this.productService.getBuyProduc();
    this.productService.productToBuyEmitter.subscribe(
      (buyProduct: Product[]) => {
        this.boughtProducts = buyProduct
      }
    )
    this.signinForm = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]/)]),
      "email": new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/[0-9]/)]),
      "select": new FormControl('fastest', Validators.required)
    })
  }
  onSubmit() {
    this.user.name = this.signinForm.get('name').value;
    this.user.email = this.signinForm.get('email').value;
    this.user.select = this.signinForm.get('select').value;
    this.submitMode = true
  }

  deleteProduct(index: number) {
    this.productService.deleteProductFromOrderForm(index);
  }

}
