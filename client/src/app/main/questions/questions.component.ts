import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import {QuestionService} from '../question.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [QuestionService]

})
export class QuestionsComponent implements OnInit {
  timeLeft: number = 300;
  interval;
  showQuestionComp: boolean;
  started: boolean;
  public question;

  constructor(private questionService: QuestionService) {
    
    this.startQuiz();
    if (localStorage.getItem('question') != null) {
      this.question = JSON.parse(localStorage.getItem('question'));
    }
    else {
      this.question = null;
    }
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
    var qid = Math.floor(Math.random() * 5) + 1;
    this.questionService.getQuestionFromDB(qid);

  }

}
