import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DialogAlertComponent } from '../../layout/dialog-alert/dialog-alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(
    private dialog: MatDialog
  ) {
  }

  showLoading() {
    this.loadingSubject.next(true);
  }

  hideShowLoading() {
    this.loadingSubject.next(false);

  }

  alert(message: string, title?: string) {
    return this.dialog.open(DialogAlertComponent, {
      width: '500px',
      data: { title, message, showCancel: false },
    }).afterClosed();
  }

  confirm(message: string, title?: string) {
    return this.dialog.open(DialogAlertComponent, {
      width: '500px',
      data: { title, message, showCancel: true },
    }).afterClosed();
  }

}
