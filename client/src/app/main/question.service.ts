import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Question } from './question.model';

export class UserService {
     SelectedQuestion: Question = {
          questionID: 1, // WILL NEED TO BE CHANGED! 
          questionName: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',

     };

     constructor(private http: HttpClient) { }

     getQuestionFromDB(question: Question) {
          return this.http.post(environment.apiBaseUrl + '/questions', question);
     }
};
