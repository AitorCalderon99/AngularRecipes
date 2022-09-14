import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import * as FromApp from "../store/app.reducer";
import * as recipeActions from "../recipes/store/recipe.actions";
import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new recipeActions.fetchRecipes());
          return this.actions$.pipe(ofType(recipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    )
  }


  constructor(
    private store: Store<FromApp.AppState>, private actions$: Actions) {
  }

}
