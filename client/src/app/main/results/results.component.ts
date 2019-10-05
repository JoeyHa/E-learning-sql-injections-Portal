import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/Authentication.service';
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

  
  constructor(private resultsSerivce: ResultsService) {
    // tslint:disable-next-line: max-line-length
    if (localStorage.getItem('results') != null) {
      this.res = JSON.parse(localStorage.getItem('results'));
      this.ActualCurrectAnswers = this.res.currectAnswers / 100;
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
      console.log(this.currentUser);
    }
  }

  ngOnInit() {
  }

  isLevelUp(currentLevel: number) {
    this.canUpdate = false;
    if (currentLevel == 1 && this.ActualCurrectAnswers > this.Qlength * 0.6 ) {
      this.canUpdate = true;
    }
    else if (currentLevel == 2 && this.ActualCurrectAnswers > this.Qlength * 0.75) {
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
