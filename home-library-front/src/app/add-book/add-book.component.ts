import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: any;

  constructor( 
    private booksService: BooksService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.booksService.test(form.value["search_isbn"]);
    // this.booksService.getBookFromApiByIsbn(form.value['search_isbn'])
    // this.book = this.booksService.bookFromApi;
  }

  

}
