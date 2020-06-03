import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.css']
})
export class LibraryViewComponent implements OnInit {

  books: any[];
  booksSubscription: Subscription;

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
    this.onFetch();
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: any[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooksSubject();
  }

  onSave() {
    this.booksService.saveBooksToServer();
  }

  onFetch() {
    this.booksService.getBooksFromServer();
  }

}
