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
  public questions: Question[];
  public index:number = 0;
  selectedOption:string;
  score:number = 0;
  finalScore: number;

  constructor(private questionService: QuestionService) {
    this.startQuiz();
    if (localStorage.getItem('questions') != null) {
      this.questions = JSON.parse(localStorage.getItem('questions'));
      console.log(this.questions);
    }
    else {
      this.questions = null;
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
    this.questionService.getQuestionsFromDB();

  }
  next() {
    if (this.selectedOption === this.questions[this.index].currectAnswer)
    {
      this.score++;
    }
    this.index++;
  }
  back() {
    this.index--;
  }
  finishQuiz()
  {
    this.pauseTimer();
    this.finalScore = this.score + this.timeLeft;
    console.log(this.finalScore);
  }
}
