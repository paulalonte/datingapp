import { ToastService } from './../toast/toast.service';
import { IUser } from './../models/user';
import { AccountService } from './../services/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private accountService: AccountService, private router: Router, private toastService: ToastService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(): void {
    this.accountService.login(this.model)
      .subscribe(
        result => {
          this.router.navigate(['/members']);
          this.loginForm.reset();
          this.toastService.success({ message: 'Login Successful!', class: 'success'});
        },
        error => { this.toastService.success({ message: error.error, class: 'error'}); }
      );
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['']);
  }
}
