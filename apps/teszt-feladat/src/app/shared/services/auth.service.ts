import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from '../../../environments/environment';
import { LoginRequestInterface } from "../models/auth/login-request.interface";
import { UserInterface } from "../models/auth/user.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient) {}

  login(model: LoginRequestInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.baseUrl}/login`, model);
  }

  logout() {
    console.log('logout');
    return of(null);
  }

}
