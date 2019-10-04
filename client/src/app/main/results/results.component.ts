import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/Authentication.service';
import { User } from 'src/app/auth/user.model';
import { ResultsService } from '../results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  providers: [ResultsService]
})
export class ResultsComponent implements OnInit {

  public finalScore: number;
  public timeLeft: number;
  public currectAnswers: number;
  public ActualCurrectAnswers: number;
  public durationTime;
  private auth: AuthenticationService;
  private canUpdate: boolean;
  public currentUser: User;
  private levelUp = false;

  
  constructor(private resultsSerivce: ResultsService) {
    // tslint:disable-next-line: max-line-length
    if (localStorage.getItem('finalScore') != null && localStorage.getItem('QuestionsCurrect') != null && localStorage.getItem('timeLeft') != null ) {
      this.finalScore = JSON.parse(localStorage.getItem('finalScore'));
      this.currectAnswers = JSON.parse(localStorage.getItem('QuestionsCurrect'));
      this.timeLeft = JSON.parse(localStorage.getItem('timeLeft'));
      this.durationTime = 300 - this.timeLeft;
    }
    this.ActualCurrectAnswers = this.currectAnswers / 100;
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
    if (this.updateUserLevel(this.currentUser)) {
      this.levelUp = true;
      this.resultsSerivce.UpdateUserLevelToDB(this.currentUser.userID, this.currentUser.level);
    }
  }

  ngOnInit() {
  }

  isLevelUp(currentLevel: number) {
    this.canUpdate = false;
    if (currentLevel == 1 && this.ActualCurrectAnswers > 3) {
      this.canUpdate = true;
    }
    else if (currentLevel == 2 && this.ActualCurrectAnswers > 3) {
      this.canUpdate = true;
    }
    return this.canUpdate;
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
