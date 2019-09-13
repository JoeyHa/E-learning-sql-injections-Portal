import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from './user.model';
 
export class UserService {
  selectedUser: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }
  loginUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/login', user);
  }
};