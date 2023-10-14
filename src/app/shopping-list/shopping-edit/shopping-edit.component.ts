import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list-service/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('form') shoppingListForm: NgForm;

  constructor(private shoppingListSerive: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription =
       this.shoppingListSerive
            .startedEditing
            .subscribe(
              (item: number) => {
                this.editMode = true;
                this.editedItemIndex = item;
                this.editedItem = this.shoppingListSerive.getIngredient(this.editedItemIndex);
                this.shoppingListForm.setValue({
                  name: this.editedItem.name,
                  amount: this.editedItem.amount
                })
              }
            );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.editMode ? this.shoppingListSerive.updateIngredient(this.editedItemIndex, newIngredient) : this.shoppingListSerive.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.shoppingListSerive.deleteIngredient(this.editedItemIndex);
  }
}
