import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements OnInit {

  @Input() book: any;
  @Output() details = new EventEmitter<any>();

  constructor( ) {
   }

  ngOnInit(): void {
  }

  getStatusColor = () => {
    if (this.book.onLoan) {
      return "red";
    }
    return "green";
  }

  showDetails = (book: any) => {
    console.log(book);
    this.details.emit(book);
  }

}
