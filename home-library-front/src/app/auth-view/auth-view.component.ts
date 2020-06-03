import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth-view',
  templateUrl: './auth-view.component.html',
  styleUrls: ['./auth-view.component.css']
})
  
export class AuthViewComponent implements OnInit {

  email: string;
  password: string;
  auth: boolean = false;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  onSubmit( form: NgForm) {
    this.signUp(form.value["user_email"], form.value["user_password"]);
  }

  signUp(email: string, password: string) {
    this.authService.signUp(email, password);
  }


}
