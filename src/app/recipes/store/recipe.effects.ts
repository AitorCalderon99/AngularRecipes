import {Actions, Effect, ofType} from "@ngrx/effects";
import * as recipesActions from "./recipe.actions";
import {map, switchMap} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(recipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient
        .get<Recipe[]>(
          'https://angularrecipesacalderon-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        )
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new recipesActions.setRecipes(recipes);
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient) {
  }
}
