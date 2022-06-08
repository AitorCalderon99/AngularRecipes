import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  ingredientWasAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
