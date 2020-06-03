import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class BooksService implements OnInit {

    booksSubject = new Subject<any[]>();
    bookFromApi: any;

    private books = [];

    constructor(
        private httpClient: HttpClient
    ) { }

    ngOnInit() {
        this.getBooksFromServer();
    }
    
    emitBooksSubject() {
        this.booksSubject.next(this.books.slice());
    }

    // Save library in darabase
    saveBooksToServer() {
        this.httpClient
            .put("https://home-library-28d67.firebaseio.com/books.json", this.books)
            .subscribe(
                () => {
                    console.log("Library saved successfully.");
                },
                (error) => {
                    console.log("Error : ", error);
                }
            )
    }

    // Get all books from database
    getBooksFromServer() {
        this.httpClient
            .get<any[]>("https://home-library-28d67.firebaseio.com/books.json")
            .subscribe(
                (response) => {
                    if (response !== null) {
                        this.books = response;
                        this.emitBooksSubject();
                    }
                },
                (error) => {
                    console.log("Loading error: ", error);
                }
        )
    }

    // Get book from API by Isbn code
    getBookFromApiByIsbn(search: string) {
        this.httpClient
            .get<any[]>("https://www.googleapis.com/books/v1/volumes?q=isbn:" + search + "&key=AIzaSyB4MXsCfHEuOfsNGPdJU3viII_SyjsxDjE")
            .subscribe(
                (response) => {
                    if (response["totalItems"] > 0) {
                        this.bookFromApi = response["items"][0].volumeInfo;
                    } else {
                        console.log("No result")
                    }
                },
                (error) => {
                    console.log("Error: ", error);
                },
                () => {
                    console.log("Completed !");
                }
        )
    }

    test(isbn: string) {
        this.httpClient
            .post('http://localhost:3000/add', { isbn: isbn })
            .subscribe(
                (response) => {
                    console.log("Post request OK");
                },
                (error) => {
                    console.log("Post request failed");
                },
                () => {
                    console.log("request completed");
                }
        )
    }
    
}