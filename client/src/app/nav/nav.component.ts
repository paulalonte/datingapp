import { IUser } from './../models/user';
import { AccountService } from './../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public title = 'DatingApp';
  public model: any = {};
  public currentUser$: Observable<IUser>;

  @ViewChild('loginForm') loginForm: NgForm;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    this.accountService.login(this.model)
      .subscribe(
        result => {
          this.loginForm.reset();
        },
        error => console.log(error)
      );
  }

  logout(): void {
    this.accountService.logout();
  }
}
