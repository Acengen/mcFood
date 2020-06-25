import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== null;
      this.formCreation();
    });
  }
  onSubmit() {
    const newProduct = new Product(
      this.productForm.value['name'],
      this.productForm.value['description'],
      this.productForm.value['imgPath'],
      this.productForm.value['ingredients'],
      this.productForm.value['price']
    )
    if (this.editMode) {
      this.productService.updateProduct(this.id, newProduct)
    }
    this.onCancel()
  }

  addNewIngredient() {
    (<FormArray>this.productForm.get('ingredients')).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onClear(index: number) {
    (<FormArray>this.productForm.get('ingredients')).removeAt(index)
  }



  formCreation() {
    let productName = '';
    let productImage = '';
    let productDescription = '';
    let productPrice = null;
    let ingredientArray = new FormArray([]);
    if (this.editMode) {
      const productById = this.productService.getProductById(this.id);
      productName = productById.name;
      productImage = productById.imgFile;
      productDescription = productById.description;
      productPrice = productById.price;

      if (productById['ingredient']) {
        for (let ingredients of productById.ingredient) {
          ingredientArray.push(
            new FormGroup({
              "name": new FormControl(ingredients.name, Validators.required),
              "amount": new FormControl(ingredients.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.productForm = new FormGroup({
      "name": new FormControl(productName, Validators.required),
      "imgPath": new FormControl(productImage, Validators.required),
      "description": new FormControl(productDescription, Validators.required),
      "price": new FormControl(productPrice, Validators.required),
      "ingredients": ingredientArray,
    });




  }
  get constrols() {
    return (<FormArray>this.productForm.get('ingredients')).controls;
  }
}
