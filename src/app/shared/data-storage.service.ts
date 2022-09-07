import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {  map, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as recipesActions from "../recipes/store/recipe.actions";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipesService: RecipesService, private store: Store<fromApp.AppState>) {
  }

  recipesUrl = 'https://angularrecipesacalderon-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  storeRecipes() {
    this.httpClient.put(
      this.recipesUrl,
      this.recipesService.getRecipes()).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  fetchRecipes() {
    return this.httpClient
      .get<Recipe[]>(
        this.recipesUrl
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          //this.recipesService.setRecipes(recipes);
          this.store.dispatch(new recipesActions.setRecipes(recipes));
        })
      )
  }
}
