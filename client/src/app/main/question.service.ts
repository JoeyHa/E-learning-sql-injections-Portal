import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Question } from './question.model';

export class QuestionService {
     SelectedQuestion: Question;

     constructor(private http: HttpClient) { }

     getQuestionFromDB(qid: number) {
          this.http.post(environment.apiBaseUrl + '/question', {qid})
          .subscribe((res: any) => {
               if (res.code == '200') {
                    this.SelectedQuestion = {
                         questionID: res.questionID,
                         questionName: res.questionName,
                         option1: res.option1,
                         option2: res.option2,
                         option3: res.option3,
                         option4: res.option4
                    };
                    localStorage.setItem('question', JSON.stringify(this.SelectedQuestion));
               } else {
                    if (res.code == '400' || res.code == '204') {
                         console.log(res.status);
                    }
               }
          });
          return this.SelectedQuestion;
     }
}
