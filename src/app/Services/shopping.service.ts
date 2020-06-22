import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Models/shopping.model';

export class ShoppingService {
  ingChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [];

  getIngredient() {
    return this.ingredients.slice();
  }

  addIng(Ingredient: Ingredient) {
    this.ingredients.push(Ingredient);
    this.ingChange.emit(this.ingredients.slice());
  }
  clearIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingChange.emit(this.ingredients.slice());
  }

  addIngredientToSL(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingChange.emit(this.ingredients.slice());
  }
}
