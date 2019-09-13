import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  serverErrorMessages: string;
  
  constructor(
    // private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private userService: UserService) { }

ngOnInit() {}

onSubmit(form: NgForm) {
    this.userService.loginUser(form.value).subscribe(
        res => {
            this.router.navigateByUrl('/home');
        },
        err => {
            if (err.status === 400) {
                this.serverErrorMessages = err.error.join('<br/>');
            }
            else {
                this.serverErrorMessages = 'Wrong Password or Emails';
            }
        }
    )};
}

