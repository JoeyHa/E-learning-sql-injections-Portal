import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ResultsService } from '../results.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuestionService, ResultsService]
})
export class QuizComponent implements OnInit {
  isOn = true;
  constructor() {
   }

  ngOnInit() {

  }
  startQuiz() {
    this.isOn = false;
    //this.questions.startQuiz();
  }
}
