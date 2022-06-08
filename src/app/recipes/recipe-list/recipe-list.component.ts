import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Spicy chicken wings', 'Whatever','https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg'),
    new Recipe('Test', 'Whatever','https://images.freeimages.com/images/large-previews/d4f/www-1242368.jpg')

  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
