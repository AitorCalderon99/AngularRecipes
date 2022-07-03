import { Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor(private shoppingListServ: ShoppingListService) {
  }


  private _recipes: Recipe[] = [
    new Recipe('Spicy chicken wings',
      'Whatever',
      'https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg',
      [new Ingredient('Chicken wings', 6),
      new Ingredient('Spicy barbecue', 2)]),
    new Recipe('Test', 'Whatever', 'https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg', [new Ingredient('Test needed', 2)])
  ];

  get recipes(): Recipe[] {
    return this._recipes;
  }
  getRecipe(id: number) {
    return this._recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    /*for (const ingredient of Ingredients) {
      this.shoppingListServ.addIngredient(ingredient);
    }*/
    this.shoppingListServ.addIngredients(ingredients);
  }




}
