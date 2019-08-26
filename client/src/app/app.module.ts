import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { ScoreTable } from './main/ScoreTable/ScoreTable.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';


@NgModule({
  declarations: [AppComponent, ScoreTable, ToolbarComponent, MainComponent, LoginComponent, RegisterComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatPaginatorModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
