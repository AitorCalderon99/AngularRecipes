import { Injectable } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  _ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ]

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this._ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  getIngredients(){
    return this._ingredients.slice();
  }
  getIngredient(index: number){
    return this._ingredients[index];
  }
  updateIngredient(index: number, newIngredient: Ingredient){
    this._ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this._ingredients.slice());
  }

  constructor() { }
}
