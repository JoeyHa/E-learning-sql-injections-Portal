import { Component, OnInit } from '@angular/core';
import { QuestionsComponent} from '../questions/questions.component';
import { QuestionService } from '../question.service';
import { ResultsService } from '../results.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuestionService, QuestionsComponent, ResultsService]
})
export class QuizComponent implements OnInit {
  isOn = true;
  constructor(private questions: QuestionsComponent) {
   }

  ngOnInit() {

  }
  startQuiz()
  {
    this.isOn = false;
    this.questions.startQuiz();
  }
}
