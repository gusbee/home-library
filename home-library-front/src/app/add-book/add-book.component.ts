import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BooksService } from '../services/books.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  title: string;
  authors: string;
  publisher: string;
  published_date: Date;
  description: string;
  pages: number;
  cover_link: string;
  genders: string;
  message: string = "";
  isbn: string;
  added: boolean = false;

  constructor( 
    private booksService: BooksService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const isbn = form.value["search_isbn"];

    if (this.isbnControl(isbn)) {
      this.booksService.getBookFromApiByIsbn(isbn)
      .then(response => {
        if (response["totalItems"] > 0) {
          let book = response["items"][0].volumeInfo;
          this.bookDataDispatch(book, isbn);
          this.message = "book found";
        } else {
          this.message = "no result"
        }
      })
      .catch(error => {
        console.error("Error: ", error)
      });
    }   
  }

  bookDataDispatch = (data: any[], isbn: string) => {
    this.title = data["title"];
    this.authors = data["authors"].join(", ");
    this.publisher = data["publisher"];
    this.published_date = new Date(data["publishedDate"]);
    this.description = data["description"];
    this.pages = data["pageCount"];
    this.genders = data["categories"].join(", ");
    this.cover_link = data["imageLinks"].smallThumbnail;
    this.isbn = isbn;
  }

  isbnControl(isbn: string) {
    if ( isbn.length != 13 ) {
      this.message = "error isbn";
      return false;
    }
    return true;
  }

  addBook = () => {
    this.booksService.addBookToLibrary( {
      title: this.title,
      authors: this.authors,
      publisher: this.publisher,
      published_date: this.published_date,
      description: this.description,
      pages: this.pages,
      cover_link: this.cover_link,
      genders: this.genders,
      isbn: this.isbn,
      onLoan: false,
      loanDetails: {}
    })    
    this.added = true;
  }

}
