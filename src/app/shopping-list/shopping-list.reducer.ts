import {Ingredient} from "../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


const initialState = {
  ingredients: [
    new Ingredient('Apples', 10),
    new Ingredient('Tomatoes', 5)
  ]
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }

  }

}
