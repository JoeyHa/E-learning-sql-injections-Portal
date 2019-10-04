import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || ('null')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get currentUserID(): number {
        return this.currentUserSubject.value.userID;
    }

    login(email: string, password: string)  {
         this.http.post(environment.apiBaseUrl + '/login', { email, password })
         .subscribe((res: any) => {
             if (res.code == '200') {
                this.user = {
                     userID: res.userID,
                     email: res.email,
                     password: res.password,
                     firstName: res.firstName,
                     lastName: res.lastName,
                     level: res.level
                 };
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                this.currentUserSubject.next(this.user);
             } else {
                if (res.code == '400' || res.code == '204') {
                     console.log(res.status);
                     this.user = null;
                }
             }
            });
         return this.user;
    }

    logout(currentUser: User) {
        // remove user data from local storage for log out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
