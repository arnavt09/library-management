import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Borrow } from '../../services/borrow';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-borrow-history',
  imports: [CommonModule],
  templateUrl: './borrow-history.html',
  styleUrl: './borrow-history.css'
})
export class BorrowHistory implements OnInit {
  records: any[] = [];
  message = '';
constructor(
    private borrowService: Borrow,
    private authService: Auth
  ) {}
ngOnInit(): void {
    this.loadHistory();
  }
loadHistory(): void {
    const userId = this.authService.getUserId();
if (!userId) {
      this.message = 'Please login first';
      return;
    }
this.borrowService.getUserBorrowHistory(userId).subscribe({
      next: (data) => {
        this.records = data;
      },
      error: () => {
        this.message = 'Failed to load borrow history';
      }
    });
  }
returnBook(recordId: string): void {
    this.borrowService.returnBook(recordId).subscribe({
      next: () => {
        this.message = 'Book returned successfully';
        this.loadHistory();
      },
      error: (error) => {
        this.message = error.error.message || 'Return failed';
      }
    });
  }
}
