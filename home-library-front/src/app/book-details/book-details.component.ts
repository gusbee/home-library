import { Component, OnInit, Input } from '@angular/core';
import { BooksService } from '../services/books.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  @Input() book: any;

  constructor(
    private booksService: BooksService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit = (form: NgForm) => {
    if (this.book.onLoan) {
      form.value["who"] = "";
      form.value["the_date"] = "";
      form.value["comment"] = "";
    }
    this.booksService.updateLoanInformation(this.book, form.value)
  }

}
