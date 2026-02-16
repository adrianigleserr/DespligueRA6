import { Routes } from '@angular/router';
import { BookList } from './book-list/book-list';
import { BookForm } from './book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookList },
  { path: 'new', component: BookForm },
  { path: 'edit/:id', component: BookForm },
  { path: '**', redirectTo: '' }
];