import { IUser } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'https://localhost:5001/api/';

  private currentUserSource = new ReplaySubject<IUser>(1);

  public currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: IUser) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }

          return user;
        })
      );
  }

  register(model: any) {
    return this.http.post<any>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user: IUser) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }

          return user;
        })
      );
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
