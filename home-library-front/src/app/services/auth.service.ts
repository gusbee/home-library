import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
    
    id: string;
    error_message: string;
    isAuth: boolean = false;

    constructor(
        private httpClient: HttpClient,
    ) { }

    setId (id: string) {
        this.id = id;
    }

    // Create new user
    signUp = (id: string, password: string) => {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post("http://localhost:3000/sign-up", { user_id: id, password: password }, { responseType: "text" })
                .subscribe(
                    (response) => {
                        if (response === "create") {
                            this.isAuth = true;
                            this.id = id;
                        }
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                )
        });
    }

    signIn = (id: string, password: string) => {
        return new Promise((resolve, reject) => {
            this.httpClient
                .post("http://localhost:3000/sign-in", { id: id, password: password }, { responseType: "text" })
                .subscribe(
                    (response) => {
                        if (response === "signed in") {
                            this.isAuth = true;
                            this.id = id;
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
        this.isAuth = false;
    }
}