import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() book: any;
  @Input() filter = "";
  @Input() index: number;
  @Output() details = new EventEmitter<any>();

  constructor( private booksService: BooksService) {}

  ngOnInit(): void {
  }

  getStatusColor = () => {
    if (this.book.onLoan) {
      return "red";
    }
    return "green";
  }

  showDetails = (book: any) => {
    this.details.emit(book);
  }

  deleteBook = (index: number) => {
    this.booksService.deleteBook(index);
  }

}
