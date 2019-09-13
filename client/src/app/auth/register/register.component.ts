import { Component, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router, RouterModule  } from '@angular/router';
import {UserService } from "../user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  showSucessMessage: boolean;
  serverErrorMessages: string;


  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }
  constructor(private userService: UserService, private router: Router) { }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.router.navigateByUrl('/login');

      },
      err => {
        if (err.status === 400) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    )};

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
