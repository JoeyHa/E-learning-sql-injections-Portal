import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../Authentication.service';
import { pipe } from 'rxjs/internal/util/pipe';
import { User } from '../user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    isAuthenticated = true;
    error: any;
    data: any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        else {
            localStorage.clear();
        }
     }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // for accessing to form fields
    get fval() { return this.loginForm.controls; }

    onSubmit() {
        if (this.loginForm.invalid) {
            this.isAuthenticated = false;
            return;
        }
        this.authenticationService.login(this.fval.email.value, this.fval.password.value)
        .pipe(first())
        .subscribe(
            data => {
                    if (data.code == '200') {
                        this.isAuthenticated = true;
                        this.router.navigate(['/home']);
                    } else {
                        this.isAuthenticated = false;
                    }
                });
    }
}
