import {Component, Injectable} from '@angular/core';
import {Sort} from '@angular/material';

export interface User {
  userName: string,
  score: number,
  durationTime: string

}

@Component({
  selector: "app-ScoreTable",
  templateUrl: "./ScoreTable.component.html",
  styleUrls: ["./ScoreTable.component.css"]
})
export class ScoreTable {
  dataSource: User[] = [
    { userName: "Joey", score: 356, durationTime: "6:37" },
    { userName: "Uriel", score: 305, durationTime: "9:51" },
    { userName: "Timor", score: 305, durationTime: "16:14" },
    { userName: "Roi", score: 234, durationTime: "10:13" },
    { userName: "Omer", score: 116, durationTime: "16:23" }
  ];
  displayedColumns: string[] = ["userName", "score", "durationTime"];
}

