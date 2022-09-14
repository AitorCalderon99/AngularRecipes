import {Actions, Effect, ofType} from "@ngrx/effects";
import * as recipesActions from "./recipe.actions";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

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

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(ofType(recipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {

      return this.httpClient.put(
        'https://angularrecipesacalderon-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipesState.recipes)
    }))

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>) {
  }
}
