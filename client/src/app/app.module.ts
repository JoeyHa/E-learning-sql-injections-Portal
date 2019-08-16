import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatTableModule } from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreTable } from "./ScoreTable/ScoreTable.component";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatButtonModule, MatIconModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DownBarComponent } from './down-bar/down-bar.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, ScoreTable, ToolbarComponent, DownBarComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
