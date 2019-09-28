import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Question } from './question.model';

export class QuestionService {
     questions: Question[];

     constructor(private http: HttpClient) { }

     getQuestionsFromDB() {
          this.http.get(environment.apiBaseUrl + '/questions')
          .subscribe((res: any) => {
               if (res.code == '200') {
                    this.questions = res.questions;
                    localStorage.setItem('questions', JSON.stringify(this.questions));
               } else {
                    if (res.code == '400' || res.code == '204') {
                         console.log(res.status);
                    }
               }
          });
          return this.questions;
     }
}
