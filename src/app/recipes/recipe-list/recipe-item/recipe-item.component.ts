import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe-service/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipeItem: Recipe = new Recipe('', '', '', []);
  @Input() index: number  = 0;

  constructor(private router: Router, private route: ActivatedRoute){

  }

  // another way for routing using this method instead of routerLink
  onSelected() {
    let id = this.index;
    id++;
    this.router.navigate([id], {relativeTo: this.route})
  }
}
