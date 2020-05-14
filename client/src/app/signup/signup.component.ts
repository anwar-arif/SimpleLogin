import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, Form, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  ngOnSubmit() {
    this.userService.signup(this.signUpForm.value).subscribe(
      response => {
        this.userService.setSuccess();
      },
      error => {
        this.userService.setError();
      }
    );
    this.router.navigate(['/home']);
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
