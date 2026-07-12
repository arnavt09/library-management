import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { BookList } from './components/book-list/book-list';
import { BorrowHistory } from './components/borrow-history/borrow-history';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full'},
  { path: 'books', component: BookList },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'borrow-history', component: BorrowHistory }
];