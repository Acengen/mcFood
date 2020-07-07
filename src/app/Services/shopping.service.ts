import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Models/shopping.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShoppingService {
  ingChange = new EventEmitter<Ingredient[]>();
  editing = new EventEmitter<number>();
  private ingredients: Ingredient[] = [];

  constructor(private http: HttpClient) {}

  getIngredient() {
    return this.ingredients.slice();
  }

  getIngredientByIndex(index: number) {
    return this.ingredients[index];
  }

  addIng(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingChange.emit(this.ingredients.slice());
  }
  updateIng(index: number, addedIngredient: Ingredient) {
    this.ingredients[index] = addedIngredient;
    this.ingChange.emit(this.ingredients.slice());
  }

  addIngredientToSL(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingChange.emit(this.ingredients.slice());
  }
  onDeleteIng(index: number) {
    this.ingredients.splice(index, 1);
    this.ingChange.emit(this.ingredients.slice());
  }
  addEdit(index: number) {
    this.editing.emit(index);
  }
}
