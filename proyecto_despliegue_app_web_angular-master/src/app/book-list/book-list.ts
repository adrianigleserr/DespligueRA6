import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../book.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-book-list',
  imports: [CommonModule,
    RouterModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (error) => console.error('Error:', error)
    });
  }

  deleteBook(id: number): void {
    if (confirm('¿Eliminar libro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks()
      });
    }
  }
}