import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}
  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  login(user: any) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
  saveUser(user: any): void {
    localStorage.setItem('libraryUser', JSON.stringify(user));
  }
  getUser(): any {
    const user = localStorage.getItem('libraryUser');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
  getUserId(): string {
    const user = this.getUser();
    if (user && user._id) {
      return user._id;
    }
    return '';
  }
  logout(): void {
    localStorage.removeItem('libraryUser');
  }
}
