import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, Form, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService) { }

  
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(
      response => {
        this.userService.setSuccess("Logged in successful!");
      },
      error => {
        this.userService.setError("Something went wrong!");
      }
    )
    this.router.navigate(['/home']);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }
}
