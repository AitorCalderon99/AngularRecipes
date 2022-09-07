import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const SET_RECIPES = '[Recipes] Set recipes';

export class setRecipes implements Action{
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {
  }

}

export type RecipesActions = setRecipes;
