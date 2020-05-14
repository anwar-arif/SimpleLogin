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
  
  private _messageSource = new Subject<string>();
  actionMessage$ = this._messageSource.asObservable();

  login(user: User): Observable<User> {
    return this.http.put<User>(this.userUrl, user);
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }

  setMessage(msg?: string) {
    this._messageSource.next(msg);
  }
}
