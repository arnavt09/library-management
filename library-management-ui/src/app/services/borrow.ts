import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Borrow {
  private apiUrl = 'http://localhost:5000/api/borrow';

  constructor(private http: HttpClient) {}

  borrowBook(userId: string, bookId: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      userId: userId,
      bookId: bookId
    });
  }

  returnBook(recordId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/return`, {
      recordId: recordId
    });
  }

  getUserBorrowHistory(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user${userId}`);
  }

  getAllBorrowRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}