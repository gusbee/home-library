import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthViewComponent } from './auth-view/auth-view.component';

const appRoutes: Routes = [
  { path: "my-library", component: AppComponent },
  { path: "add-book", component: AppComponent },
  { path: "test", component: AppComponent },
  { path: "", component: AuthViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
