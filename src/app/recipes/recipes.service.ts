import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private _recipes: Recipe[] = [
    new Recipe('Spicy chicken wings', 'Whatever','https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg'),
    new Recipe('Test', 'Whatever','https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg')
  ];

  get recipes(): Recipe[] {
    return this._recipes;
  }

  constructor() { }
}
