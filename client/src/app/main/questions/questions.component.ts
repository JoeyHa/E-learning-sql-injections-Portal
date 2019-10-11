import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import {QuestionService} from '../question.service';
import { Router } from '@angular/router';
import { ResultsService} from '../results.service';
import { AuthenticationService } from '../../auth/Authentication.service';
import { Results } from '../results.model';
import { first } from 'rxjs/operators';
import { Questions} from '../questions.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionService, ResultsService]

})
export class QuestionsComponent implements OnInit {
  timeLeft: number = 300;
  interval;
  showQuestionComp: boolean;
  started: boolean;
  public question: Question;
  public questions: Questions;
  public index: number = 0;
  selectedOption: string;
  score: number = 0;
  finalScore: number;
  public currentUser;
  results: Results;
  Qlength: any;
  correctAns: number;
  timeIsUp: boolean;

  constructor(private questionService: QuestionService, private router: Router, private resultsService: ResultsService) {
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
    this.questionService.getQuestionsFromDB(this.currentUser.level)
      .pipe()
      .subscribe(
        questions => {
          if (questions.code == '200') {
            this.questions = questions;
            this.Qlength = questions.questions.length;
            localStorage.setItem('Qlength', JSON.stringify(this.Qlength));
          }
        });
    this.startQuiz();
    this.score = 0;
    this.correctAns = 0;
    this.timeIsUp = false;
   }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeIsUp = true;
        this.finishQuiz();
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
  }
  next() {
    this.checkForCorrectAnswers();
    this.index++;
  }
  back() {
    this.index--;
  }

  checkForCorrectAnswers() {
    switch (this.currentUser.level) {
      case 1:
        if (this.selectedOption === this.questions.questions[this.index].currectAnswer) {
          this.score += 100;
          this.correctAns++;
        }
        break;
      case 2:
        if (this.selectedOption === this.questions.questions[this.index].currectAnswer) {
          this.score += 200;
          this.correctAns++;
        }
        break;
      default:
        if (this.selectedOption === this.questions.questions[this.index].currectAnswer) {
          this.score += 300;
          this.correctAns++;
      }
    }
  }

  finishQuiz() {
    this.checkForCorrectAnswers();
    this.pauseTimer();
    this.finalScore = this.score + this.timeLeft + this.correctAns;
    const userID = this.currentUser.userID;
    if ((userID != null || userID.toString() !== 'undefined') && !this.timeIsUp) {
      this.results = {
        userID: this.currentUser.userID,
        finalScore: this.finalScore,
        currectAnswers: this.correctAns,
        timeLeft: this.timeLeft
      };
    } else {
      this.results = {
        userID: this.currentUser.userID,
        finalScore: this.finalScore,
        currectAnswers: this.correctAns,
        timeLeft: 0
      };
    }
    localStorage.setItem('results', JSON.stringify(this.results));
    localStorage.removeItem('questions');
    this.saveUserResult(this.results);
  }
  saveUserResult(res: Results) {
    const userID = res.userID;
    if (userID != null || userID.toString() !== 'undefined') {
      this.resultsService.SaveResultsToDB(res);
      this.router.navigate(['/results']);
    } else {
        alert('Cant Get UserID');
      }
    }
}
