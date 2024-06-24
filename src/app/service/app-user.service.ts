import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../model/page';import { AppUserDto } from '../model/app-user-dto';
;

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<AppUserDto[]> {
    return this.http.get<AppUserDto[]>(`${this.baseUrl}/appuser/appusers`);
  }

  saveUser(appuser: AppUserDto): Observable<AppUserDto> {
     return this.http.post<AppUserDto>(`${this.baseUrl}/appuser/appuser`, appuser);
  }


}
