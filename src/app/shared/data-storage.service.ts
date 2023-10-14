import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe-service/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    constructor(private http: HttpClient, private recipeService: RecipeService){}

    saveRecipes(): void{
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http
        .put('https://recipe-book-5257a-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe((recipes)=>{
            console.log(recipes);
        })
    }

    fetchRecipes(){
       return this.http
        .get<Recipe[]>('https://recipe-book-5257a-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map((recipes)=>{
                return recipes.map(recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}))
            }),
            tap((recipes)=>{
                this.recipeService.setRecipes(recipes);
            })
        ) 
    }
}