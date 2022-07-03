import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  subscriptionStartEditing: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscriptionStartEditing = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onSubmit(f: NgForm) {
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(f.value.name, +f.value.amount));
    } else {
      this.shoppingListService.addIngredient(new Ingredient(f.value.name, +f.value.amount));
    }
    this.onClickClear();
  }

  ngOnDestroy() {
    this.subscriptionStartEditing.unsubscribe();
  }

  onClickClear() {
    this.editMode = false;
    this.form.reset();
  }

  onClickDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClickClear();
  }
}
