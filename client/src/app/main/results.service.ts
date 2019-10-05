import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Results } from './results.model';

export class ResultsService {

  constructor(private http: HttpClient) { }

  SaveResultsToDB(userResults: Results) {
    this.http.post(environment.apiBaseUrl + '/results', userResults)
      .subscribe((res: any) => {
        if (res.code == '200') {
          return true;
        }
        else {
          return false;
        }
      });
  }

  UpdateUserLevelToDB(userID: number, level: number) {
    this.http.post(environment.apiBaseUrl + '/updateLevel', {userID, level})
      .subscribe((res: any) => {
        if (res.code == '200') {
          return true;
        }
        else {
          return false;
        }
      });
  }
}
