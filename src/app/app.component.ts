import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RecipeComponent } from "./components/recipe/recipe.component";
import { RecipeListComponent } from "./components/recipe-list/recipe-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet,RouterModule]
})
export class AppComponent {
  title = 'openbar-ui';
}
