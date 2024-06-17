import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../model/recipe-dto';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllRecipes(page: number, size: number): Observable<Page<RecipeDto>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<RecipeDto>>(`${this.baseUrl}/recipe/recipes`, { params });
  }

  saveRecipe(recipe: RecipeDto): Observable<RecipeDto> {
    return this.http.post<RecipeDto>(`${this.baseUrl}/recipe/recipe`, recipe);
  }



}
