import { IToast } from './toast';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ToastService {

    private toastSub$ = new Subject<IToast>();

    public showHideToast$ = this.toastSub$.asObservable();

    success(val: IToast) {
        this.toastSub$.next(val);
        this.hideToast();
    }

    error(val: IToast) {
        this.toastSub$.next(val);
        this.hideToast();
    }

    hideToast() {
        setTimeout(() => { this.toastSub$.next(); }, 4000);
    }
}
