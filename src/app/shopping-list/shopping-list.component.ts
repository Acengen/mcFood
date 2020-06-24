import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ShoppingService } from '../Services/shopping.service';
import { Ingredient } from '../Models/shopping.model';
import { CanDeactivateGuard } from './canDeactivateGuard/canDeactivate.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, CanDeactivateGuard {
  saved = false;
  ingredients: Ingredient[];
  delivery = ['cheapest', 'faster'];
  defaultValue = 'faster';
  indexEdited: number;
  editedIngredient: Ingredient;
  editMode = false;
  @ViewChild('f') addForm: NgForm;
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingChange.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
    this.shoppingService.editing.subscribe((index: number) => {
      this.indexEdited = index;
      this.editMode = true;
      this.editedIngredient = this.shoppingService.getIngredientByIndex(index);
      this.addForm.setValue({
        username: this.editedIngredient.name,
        amount: this.editedIngredient.amount,
      });
    });
  }
  addIngredient(form: NgForm) {
    const ingName = form.value.username;
    const ingAmount = form.value.amount;
    if (!ingName || !ingAmount) {
      return null;
    }
    const newIng = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingService.updateIng(this.indexEdited, newIng);
    } else {
      this.shoppingService.addIng(newIng);
    }

    this.saved = true;
    this.editMode = false;
    this.addForm.reset();
  }

  addEdit(index: number) {
    this.shoppingService.addEdit(index);
  }
  onClear() {
    this.addForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingService.onDeleteIng(this.indexEdited);
    this.onClear();
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.addForm.value.name === '' && !this.saved) {
      return confirm('Are you sure?');
    } else {
      return true;
    }
  }
}
