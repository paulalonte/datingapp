import { ToastService } from './toast.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IToast } from './toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  public msg: Observable<IToast>;
  constructor(private toastService: ToastService) { }

  ngOnInit(): void {

    this.msg = this.toastService.showHideToast$.pipe(
      map(result => result)
    );
  }

}
