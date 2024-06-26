import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { AppUserComponent } from './components/app-user/app-user.component';
import { AppUserFormComponent } from './components/app-user-form/app-user-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipeListComponent },
    { path: 'recipe/:id', component: RecipeComponent },
    { path: 'newrecipe', component: RecipeFormComponent },
    { path: 'newuser', component: AppUserFormComponent},
    { path: '**', component: NotFoundComponent }
];
