import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService, Book } from '../book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [
    FormsModule
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm  implements OnInit {
  book: Book = { title: '', author: '' };
  isEdit = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.bookService.getBook(+id).subscribe({
        next: (data) => this.book = data
      });
    }
  }

  saveBook(): void {
    if (this.isEdit) {
      this.bookService.updateBook(this.book.id!, this.book).subscribe({
        next: () => this.router.navigate(['/'])
      });
    } else {
      this.bookService.createBook(this.book).subscribe({
        next: () => this.router.navigate(['/'])
      });
    }
  }
}