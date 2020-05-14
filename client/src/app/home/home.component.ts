import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }
  
  message: String;
  ngOnInit() {
    this.userService.actionMessage$.subscribe(
      response => this.message = response,
      error => this.message = error.message
    )
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

}
