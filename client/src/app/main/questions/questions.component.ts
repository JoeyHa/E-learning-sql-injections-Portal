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
  }
  next() {
    if (this.selectedOption === this.questions.questions[this.index].currectAnswer)
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
    const userID = this.currentUser.userID;
    if (userID != null || userID.toString() !== 'undefined') {
      this.results = {
        userID: this.currentUser.userID,
        finalScore: this.finalScore,
        currectAnswers: this.score,
        timeLeft: this.timeLeft
      };
      localStorage.setItem('results', JSON.stringify(this.results));
      localStorage.removeItem('questions');
      this.saveUserResult(this.results);
    }
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
