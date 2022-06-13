import { Injectable } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  _ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ]

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
  }
  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
  }

  getIngredients(){
    return this._ingredients;
  }

  constructor() { }
}
