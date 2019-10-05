import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/Authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  title = 'SQL-Injections Portal';
  public currentUser;
  authenticationService: AuthenticationService;

  constructor(private router: Router) { 
    if (localStorage.getItem('currentUser') != null) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } else {
      this.currentUser = null;
    }
  }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
