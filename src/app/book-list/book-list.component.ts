import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BooksService} from '../services/books.service';
import {Subscription} from 'rxjs';
import {Book} from '../models/book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];

  bookSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      });
    this.bookService.getBooks();
    this.bookService.emitBooks();
  }

  public onNewBook(): void {
    this.router.navigate(['/books', 'new']);
  }

  onViewBook(id: number): void {
    this.router.navigate(['/books', 'view', id]);
  }

  onDeleteBook(book: Book): void {
    this.bookService.deleteBook(book);
  }


}
