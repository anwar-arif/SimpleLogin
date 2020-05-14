import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  private baseUrl = "https://localhost:44301/api/";
  private userUrl = this.baseUrl + "users/";
  
  private message: String;

  login(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  setError(msg?: string) {
    this.message = (msg) ? msg : "Something went wrong";
  }

  setSuccess(msg?: string) {
    this.message = (msg) ? msg : "Succeful";
  }

  getMessage() {
    return this.message;
  }

  errorHandler(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error', errorResponse.error.message);
    } else {
      console.error('Server side error', errorResponse);
    }
    return throwError('Something went wrong! Try again later.');
  }
}
