import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Book {
 private apiUrl = 'http://localhost:5000/api/books';
constructor(private http: HttpClient){}
getBooks(): Observable<any> {
  return this.http.get(this.apiUrl);
 }
addBook(book:any): Observable<any> {
  return this.http.post(this.apiUrl, book);
 }
deleteBook(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
 }
}