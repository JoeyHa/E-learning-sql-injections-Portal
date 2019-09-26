import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  timeLeft: number = 300;
  interval;
  showQuestionComp = false;
  started: boolean;



  constructor() {
    this.started = false;
   }

  ngOnInit() {

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
  startQuiz()
  {
    this.showQuestionComp = true;
    this.started = true;
    this.startTimer();
    //Need to show Questions here!
  }





}
