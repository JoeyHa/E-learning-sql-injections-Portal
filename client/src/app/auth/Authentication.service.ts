import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;
    public user: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || ('null')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public get currentUserID(): number {
        return this.currentUserSubject.value.userID;
    }

     login(email: string, password: string)  {
         return this.http.post<User>(environment.apiBaseUrl + '/login', { email, password })
            .pipe(map(data => {
                this.user = data;
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                this.currentUserSubject.next(this.user);
                return this.user;
            }));
        }
}
