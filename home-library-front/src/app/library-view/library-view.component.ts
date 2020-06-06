import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';import { NgForm } from '@angular/forms';
;

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.css']
})
export class LibraryViewComponent implements OnInit {

  library: any;
  book: any;
  filtered = ["no filter"];
  filter = "";

  constructor(
    private booksService: BooksService
  ) {  
    this.library = this.booksService.library;
  }

  ngOnInit(): void { 
  }

  onSubmit(form: NgForm) {
    switch (form.value["search_by"]) {
      case "title":
        this.filter = "titre";
        this.findByTitle(form.value["search_value"]);
        break;
      case "authors":
        this.filter = "auteur";
        this.findByAuthor(form.value["search_value"]);
        break;
      case "genders":
        this.filter = "genre";
        this.findByGender(form.value["search_value"]);
        break;
      case "isbn":
        this.filter = "code isbn";
        this.findByIsbn(form.value["search_value"]);
    }
  }

  findByTitle = (title: string) => { 

    this.filtered = [];

    const regex = new RegExp(title, "i");

    this.library.forEach(book => {
      if (regex.test(book.title)) {
        this.filtered.push(book);
      }
    });
    if (this.filtered.length === 0) {
      this.filtered.push("no result");
    }
  }
  
  findByAuthor = (author: string) => {
    this.filtered = [];

    const regex = new RegExp(author, "i");

    this.library.forEach(book => {
      if (book.authors !== undefined && regex.test(book.authors)) {
        this.filtered.push(book);
      }
    });
    if (this.filtered.length === 0) {
      this.filtered.push("no result");
    }
   }
  
  findByGender = (gender: string) => {

    this.filtered = [];

    const regex = new RegExp(gender, "i");

    this.library.forEach(book => {
      if (book.genders !== undefined && regex.test(book.genders)) {
        this.filtered.push(book);
      }
      if (this.filtered.length === 0) {
        this.filtered.push("no result");
      }
    });

   }
  
  findByIsbn = (isbn: string) => {
    this.filtered = [];

    const regex = new RegExp(isbn, "i");

    this.library.forEach(book => {
      if (book.isbn !== undefined && regex.test(book.isbn)) {
        this.filtered.push(book);
      }
      if (this.filtered.length === 0) {
        this.filtered.push("no result");
      }
    });
   }
  
  clearSearch = () => { 
    this.filtered = ["no filter"];
    this.filter = "";
  }
  
  onDetails = (book: any) => {
    this.book = book;
  }
}

