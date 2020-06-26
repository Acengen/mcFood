import { Product } from '../Models/product.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Models/shopping.model';
import { ShoppingService } from './shopping.service';

@Injectable()
export class ProductService {
  productSelected = new EventEmitter<Product>();
  productChanged = new EventEmitter<Product[]>();
  productToBuyEmitter = new EventEmitter<Product[]>();
  productTotalPriceEmitter = new EventEmitter<number>();

  total = 0;

  private buyProduct: Product[] = [];
  private products: Product[] = [
    new Product(
      'Hamburger',
      'Fresh burger',
      'https://i.pinimg.com/originals/fb/f9/e6/fbf9e67388d5a81440760f4672f74ec3.png',
      [new Ingredient('kechap', 1)],
      1
    ),
    new Product(
      'Cheeseburger',
      'Fresh cheeseburger',
      'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/nutrition/items/hero/desktop/t-mcdonalds-Cheeseburger.jpg',
      [new Ingredient('kechap', 1), new Ingredient('cheese', 2)],
      3
    ),
    new Product(
      'Big Burger',
      'very testy',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRmwTMmYLb9_SHzQsuf5Uy603-JQJR2h8Ycw8pbvBxO7LaU8gJu&usqp=CAU',
      [new Ingredient('salad', 1)],
      5
    ),
    new Product(
      'Chicken Burger',
      'Try it and you will come back later :)',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjqnvqkYyLMCOEw9RkbqcJ5dymNUbv9lO5SL_lY9VJ3TDqbGqU&usqp=CAU',
      [new Ingredient('salad', 1), new Ingredient('bacon', 2)],
      3
    ),
  ];
  constructor(private shoppingService: ShoppingService) { }

  getProducts() {
    return this.products.slice();
  }
  getProductById(index: number) {
    return this.products[index];
  }

  getBuyProduc() {
    return this.buyProduct.slice()
  }

  buyProductOnClick(newProduct: Product) {
    this.buyProduct.push(newProduct);
    this.total += newProduct.price;
    this.productTotalPriceEmitter.emit(this.total)
    this.productToBuyEmitter.emit(this.buyProduct);
  }

  onProductSelected(product: Product) {
    this.productSelected.emit(product);

  }

  passIngredientToShoppingList(Ingredient: Ingredient[]) {
    this.shoppingService.addIngredientToSL(Ingredient);
  }

  updateProduct(index: number, newProduct: Product) {
    this.products[index] = newProduct;
    this.productChanged.emit(this.products.slice())
  }

  deletingBurger(index: number, delProduct: Product) {
    this.buyProduct.splice(index, 1);
    this.total -= delProduct.price;
    this.productTotalPriceEmitter.emit(this.total);
    this.productToBuyEmitter.emit(this.buyProduct)
  }

  deleteProductFromOrderForm(index: number) {
    this.buyProduct.splice(index, 1);
    this.productToBuyEmitter.emit(this.buyProduct);
  }

}
