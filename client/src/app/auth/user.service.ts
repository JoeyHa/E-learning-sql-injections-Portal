import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
 
export class UserService {
  constructor(private http: HttpClient) { }

  RegisterUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
  loginUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/login', user);
  }

};
