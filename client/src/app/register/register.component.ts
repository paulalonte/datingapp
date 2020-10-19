import { ToastService } from './../toast/toast.service';
import { AccountService } from './../services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();

  public model: any = {};

  constructor(private accountService: AccountService, private toastService: ToastService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
    this.accountService.register(this.model)
      .subscribe(
        response => {
          console.log(response);
          this.cancel();
        },
        error => { this.toastService.success({ message: error.error, class: 'error'}); }
      );
  }

  cancel() {
    console.log('cancel');
    this.cancelRegister.emit(false);
  }

}
