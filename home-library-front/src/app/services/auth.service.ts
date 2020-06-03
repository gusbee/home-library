import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    
    email: string;
    password: string;
    isAuth: boolean = false;

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ){}

    signUp(email: string, password: string) {
        this.httpClient
            .post("http://localhost:3000/add", { email: email, password: password })
            .subscribe(
                (response) => {
                    console.log("Added with success !");
                },
                (error) => {
                    console.log("Big fail !");
                },
                () => {
                    console.log("complete !");
                }
            );
        this.router.navigate(["/"]);
    }

    signIn() {
        
    }

    signOut() {
        
    }
}