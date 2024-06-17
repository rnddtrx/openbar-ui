import { Component } from '@angular/core';
import { Page } from '../../model/page';
import { RecipeDto } from '../../model/recipe-dto';
import { RecipeService } from '../../service/recipe.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipeComponent } from "../recipe/recipe.component";

@Component({
    selector: 'app-recipe-list',
    standalone: true,
    templateUrl: './recipe-list.component.html',
    styleUrl: './recipe-list.component.scss',
    imports: [CommonModule, RouterModule, RecipeComponent]
})
export class RecipeListComponent {

  recipesPage!: Page<RecipeDto>;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes(this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.recipesPage = data;
      },
      error : error => {
        console.error('Error fetching recipes', error);
      }
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadRecipes();
  }

}
