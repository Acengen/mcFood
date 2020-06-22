import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ShoppingService } from '../Services/shopping.service';
import { Ingredient } from '../Models/shopping.model';
import { CanDeactivateGuard } from './canDeactivateGuard/canDeactivate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, CanDeactivateGuard {
  saved = false;
  ingredients: Ingredient[];
  @ViewChild('name') nameInpRef: ElementRef;
  @ViewChild('amount') amountInpRef: ElementRef;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingChange.subscribe((ingredient: Ingredient[]) => {
      this.ingredients = ingredient;
    });
  }
  addIngredient() {
    const ingName = this.nameInpRef.nativeElement.value;
    const ingAmount = this.amountInpRef.nativeElement.value;
    if (!ingName || !ingAmount) {
      return null;
    }
    const newIng = new Ingredient(ingName, ingAmount);
    this.shoppingService.addIng(newIng);
    this.saved = true;
  }
  clearIng(index: number) {
    this.shoppingService.clearIngredient(index);
  }
  clearInputFields() {
    this.nameInpRef.nativeElement.value = '';
    this.amountInpRef.nativeElement.value = '';
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.nameInpRef.nativeElement.value && !this.saved) {
      return confirm('Are you sure?');
    } else {
      return true;
    }
  }
}
