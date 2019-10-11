import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { ResultsService } from '../results.service';
import { Results } from '../results.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [ResultsService]
})
export class ResultsComponent implements OnInit {

  public ActualCurrectAnswers: number;
  public durationTime;
  private canUpdate: boolean;
  public currentUser: User;
  private levelUp = false;
  private res: Results;
  private Qlength;
  private isPerfect = false;
  private isTimeUp = false;

  
  constructor(private resultsSerivce: ResultsService) {
    if (localStorage.getItem('results') != null) {
      this.res = JSON.parse(localStorage.getItem('results'));
      this.ActualCurrectAnswers = this.res.currectAnswers;
      this.durationTime = 300 - this.res.timeLeft;
    }
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
    if (localStorage.getItem('Qlength') != null) {
      this.Qlength = JSON.parse(localStorage.getItem('Qlength'));
    }
    if (this.updateUserLevel(this.currentUser)) {
      this.levelUp = true;
      this.resultsSerivce.UpdateUserLevelToDB(this.currentUser.userID, this.currentUser.level);
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    this.isPerfect = this.masterUser();
  }

  ngOnInit() {
  }

  isLevelUp(currentLevel: number) {
    this.canUpdate = false;
    if (currentLevel !== 3) {
      if (currentLevel == 1 && this.ActualCurrectAnswers > this.Qlength * 0.6 ) {
        this.canUpdate = true;
      }
      else if (currentLevel == 2 && this.ActualCurrectAnswers > this.Qlength * 0.74) {
        this.canUpdate = true;
      }
    }
    return this.canUpdate;
  }

  masterUser() {
    if (this.currentUser.level == 3 && this.ActualCurrectAnswers == this.Qlength) {
      this.isPerfect = true;
    }
    return this.isPerfect;
  }
  isTimeUpFunc() {
    if (this.res.timeLeft == 0) {
      this.isTimeUp = true;
    }
    return this.isTimeUp;
  }

  updateUserLevel(user: User) {
    var isUpdated = false;
    var shouldLevelUp = this.isLevelUp(this.currentUser.level);
    if (shouldLevelUp)  {
      if (this.currentUser.level < 3) {
        this.currentUser.level++;
        isUpdated = true;
      }
    }
    return isUpdated;
  }


}
