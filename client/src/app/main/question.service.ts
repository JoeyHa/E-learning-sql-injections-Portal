import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Questions } from './questions.model';
import { Question } from './question.model';

export class QuestionService {
     public questions: Questions;
     public question: Question;
     constructor(private http: HttpClient) { }

     getQuestionsFromDB(qlevel: number) {
          localStorage.removeItem('questions');
          return this.http.post<Questions>(environment.apiBaseUrl + '/questions', { qlevel })
                    .pipe(map(data => {
                         this.questions =  data;
                         localStorage.setItem('questions', JSON.stringify(this.questions));
                         return this.questions;
                    }));
     }
}
