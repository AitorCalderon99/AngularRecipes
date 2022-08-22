import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {
  }

  private ingrChangSubs: Subscription;

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.shoppingListService.getIngredients();
    this.ingrChangSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )*/
  }

  ngOnDestroy(): void {
    //this.ingrChangSubs.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
