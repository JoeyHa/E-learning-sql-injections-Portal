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
  MatIconModule,
  MatRadioModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserService } from './auth/user.service';

import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';
import { ScoreTable } from './main/ScoreTable/ScoreTable.component';
import { ToolbarComponent } from './main/toolbar/toolbar.component';
import { QuizComponent } from './main/quiz/quiz.component';
import { QuestionsComponent } from './main/questions/questions.component';
import { ResourcesComponent } from './main/resources/resources.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ScoreTable,
    ToolbarComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    QuizComponent,
    QuestionsComponent,
    ResourcesComponent
  ],
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
    MatExpansionModule,
    MatRadioModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
