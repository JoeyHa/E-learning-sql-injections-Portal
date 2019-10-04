import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import {QuestionService} from '../question.service';
import { Router } from '@angular/router';
import { ResultsService} from '../results.service';
import { AuthenticationService } from '../../auth/Authentication.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionService,ResultsService]

})
export class QuestionsComponent implements OnInit {
  timeLeft: number = 300;
  interval;
  showQuestionComp: boolean;
  started: boolean;
  public question;
  public questions: Question[];
  public index: number = 0;
  selectedOption: string;
  score: number = 0;
  finalScore: number;
  public currentUser;

  constructor(private questionService: QuestionService, private router: Router, private resultsService: ResultsService) {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
    this.startQuiz();
    if (localStorage.getItem('questions') != null) {
      this.questions = JSON.parse(localStorage.getItem('questions'));
      console.log(this.questions);
    }
    else {
      this.questions = null;
    }
    this.score = 0;
   }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 300;
      }
    }, 1000);
  }


  pauseTimer() {
    clearInterval(this.interval);
  }


  ngOnInit() {
  }


  startQuiz() {
    this.startTimer();
    this.questionService.getQuestionsFromDB();

  }
  next() {
    if (this.selectedOption === this.questions[this.index].currectAnswer)
    {
      this.score += 100;
    }
    this.index++;
  }
  back() {
    this.index--;
  }

  finishQuiz() {
    this.pauseTimer();
    this.finalScore = this.score + this.timeLeft;
    localStorage.setItem('finalScore', JSON.stringify(this.finalScore));
    localStorage.setItem('QuestionsCurrect', JSON.stringify(this.score));
    localStorage.setItem('timeLeft', JSON.stringify(this.timeLeft));
    this.saveUserResult();

  }
  saveUserResult() {
    var userID = this.currentUser.userID;
    if (userID != null || userID.toString() !== 'undefined') {
      const userResults = {
        userID: userID,
        finalScore: this.finalScore,
        currectAnswers: this.score,
        timeLeft: this.timeLeft
      };
      this.resultsService.SaveResultsToDB(userResults);
      this.router.navigate(['/results']);
    } else {
        alert('Cant Get UserID');
      }
    }
}
