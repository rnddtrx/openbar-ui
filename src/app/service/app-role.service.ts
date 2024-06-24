import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRoleDto } from '../model/app-role-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppRoleService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllRole(): Observable<AppRoleDto[]> {
    return this.http.get<AppRoleDto[]>(`${this.baseUrl}/approle/approles`);
  }
}
