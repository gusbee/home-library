import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthViewComponent } from './auth-view/auth-view.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { BooksService } from './services/books.service';
import { LibraryViewComponent } from './library-view/library-view.component';
import { AddBookComponent } from './add-book/add-book.component';

const appRoutes: Routes = [
  { path: "library", canActivate: [AuthGuard], component: LibraryViewComponent },
  { path: "add-book", canActivate: [AuthGuard], component: AddBookComponent },
  { path: "test", canActivate: [AuthGuard], component: AppComponent },
  { path: "auth", component: AuthViewComponent },
  { path: "", canActivate: [AuthGuard], component: LibraryViewComponent },
  { path: "**", redirectTo: "" }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthViewComponent,
    LibraryViewComponent,
    AddBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuard,
    BooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
