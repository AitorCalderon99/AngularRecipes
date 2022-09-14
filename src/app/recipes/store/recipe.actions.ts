import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set recipes';
export const FETCH_RECIPES = '[Recipes] Fetch recipes';
export const ADD_RECIPE = '[Recipes] Add recipe';
export const UPDATE_RECIPE = '[Recipes] Update recipe';
export const DELETE_RECIPE = '[Recipes] Delete recipe';
export const STORE_RECIPES = '[Recipes] Store recipes';


export class setRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }

}

export class fetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class deleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {
  }
}

export class updateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { newRecipe: Recipe, index: number }) {
  }
}

export class addRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class storeRecipes implements Action {
  readonly type = STORE_RECIPES;

}

export type RecipesActions = setRecipes | fetchRecipes | updateRecipe | addRecipe | deleteRecipe | storeRecipes;
