import {Component, Injectable, OnInit} from '@angular/core';
import { TopScore } from '../topScore.model';
import { TopScoreService } from '../topScore.service';
import { Router } from '@angular/router';
import { TopUser } from '../topUser.model';


@Component({
  selector: "app-ScoreTable",
  templateUrl: './ScoreTable.component.html',
  styleUrls: ['./ScoreTable.component.css'],
  providers: [TopScoreService]
})
export class ScoreTableComponent implements OnInit {
  dataSource: TopUser[];
  data: TopScore;
  displayedColumns: string[] = ['firstName', 'finalScore', 'timeLeft', 'Level'];

  constructor(private topScoreService: TopScoreService, private router: Router ) {
    this.topScoreService.getTopScoreFromDB()
    .pipe()
    .subscribe( score => {
      if(score.code == '200') {
        this.dataSource = score.topScore;
        console.log(this.dataSource[0]);
      }
    });

  }
  ngOnInit() {
  }
}


