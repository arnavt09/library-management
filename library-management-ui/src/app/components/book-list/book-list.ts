import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Book } from '../../services/book';
import { Borrow } from '../../services/borrow';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList implements OnInit {
  books: any[] = [];
  message: string = '';

  constructor(
    private bookService: Book,
    private borrowService: Borrow,
    private authService: Auth
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data: any[]) => {
        this.books = data;
      },
      error: () => {
        this.message = 'Failed to load books';
      }
    });
  }

  borrowBook(bookId: string): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.message = 'Please login first';
      return;
    }

    this.borrowService.borrowBook(userId, bookId).subscribe({
      next: () => {
        this.message = 'Book borrowed successfully';
        this.loadBooks();
      },
      error: (error: any) => {
        this.message = error.error.message || 'Borrow failed';
      }
    });
  }
}