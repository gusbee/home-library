import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    
    email: string;
    error_message: string;
    isAuth: boolean = false;

    constructor(
        private httpClient: HttpClient,
    ) { }

    setEmail (email: string) {
        this.email = email;
    }

    // Create new user
    signUp = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post("http://localhost:3000/sign-up", { email: email, password: password }, { responseType: "text" })
                .subscribe(
                    (response) => {
                        if (response === "create") {
                            this.isAuth = true;
                            this.email = email;
                        }
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                )
        });
    }

    signIn = (email: string, password: string) => {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post("http://localhost:3000/sign-in", { email: email, password: password }, { responseType: "text" })
                .subscribe(
                    (response) => {
                        if (response === "signed in") {
                            this.isAuth = true;
                            this.email = email;
                        }
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
            )
        })
    }

    signOut() {
        
    }
}