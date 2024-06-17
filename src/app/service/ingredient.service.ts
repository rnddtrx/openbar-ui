import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDto } from '../model/ingredient-dto';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  searchIngredients(query: string): Observable<IngredientDto[]> {
    return this.http.get<IngredientDto[]>(`${this.baseUrl}/ingredient/ingredient?search=${query}`);
  }
}
