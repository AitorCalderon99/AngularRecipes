import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set recipes';
export const FETCH_RECIPES = '[Recipes] Fetch recipes';


export class setRecipes implements Action{
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }

}
export class fetchRecipes implements Action{
  readonly type = FETCH_RECIPES;

}

export type RecipesActions = setRecipes | fetchRecipes;
