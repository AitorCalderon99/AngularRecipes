import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipesService} from "./recipes.service";
import {Store} from "@ngrx/store";
import * as FromApp from "../store/app.reducer";
import * as recipeActions from "../recipes/store/recipe.actions";
import {Actions, ofType} from "@ngrx/effects";
import {take} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    this.store.dispatch(new recipeActions.fetchRecipes());
    return this.actions$.pipe(ofType(recipeActions.SET_RECIPES), take(1))
  }


  constructor(private dataStorageSrv: DataStorageService,
              private recipesServ: RecipesService, private store: Store<FromApp.AppState>, private actions$: Actions) {
  }

}
