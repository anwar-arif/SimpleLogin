import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, Form, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router) { }

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required)
    });
  }

  onLogin() {
    this.router.navigate(['/login']);
  }
}
