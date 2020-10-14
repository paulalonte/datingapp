import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: IUser[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('init app comp');
    this.getUsers();
  }

  getUsers(): void {
    this.http.get<IUser[]>('https://localhost:5001/api/users')
      .subscribe(
        response => this.users = response,
        error => console.log(error)
      );
  }
}

interface IUser {
  id: string;
  userName: string;
}
