import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipesService} from "./recipes.service";


@Injectable({providedIn: "root"})
export class RecipesResolverService implements Resolve<Recipe[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const recipes = this.recipesServ.getRecipes();
    if (this.recipesServ.getRecipes().length === 0) {
      return this.dataStorageSrv.fetchRecipes();
    } else {
      return recipes;
    }
  }


  constructor(private dataStorageSrv: DataStorageService, private recipesServ: RecipesService) {
  }

}
