import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list-service/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = []
  private IngredientsSubscription: Subscription;

  constructor(private shoppingListSerive: ShoppingListService){

  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListSerive.getIngredients();
    this.IngredientsSubscription = this.shoppingListSerive.ingredientsChanged.subscribe((ingredients: Ingredient[])=> this.ingredients = ingredients);
  }

  ngOnDestroy(): void {
    this.IngredientsSubscription.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListSerive.startedEditing.next(index);
  }
  
}
