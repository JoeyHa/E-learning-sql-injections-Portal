import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Results } from './results.model';
import { TopUser } from './topUser.model';
import { TopScore } from './topScore.model';
import { map } from 'rxjs/operators';

export class TopScoreService {
  topUser: TopUser
  topScore: TopScore;

  constructor(private http: HttpClient) { }

  getTopScoreFromDB() {
    localStorage.removeItem('topScore');
    return this.http.get<TopScore>(environment.apiBaseUrl + '/topScore')
      .pipe(map(data => {
        this.topScore = data;
        localStorage.setItem('topScore', JSON.stringify(this.topScore));
        return this.topScore;
      }));
  }
}
