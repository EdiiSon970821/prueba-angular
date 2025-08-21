import { delay } from 'rxjs';
import { AlertService } from './../shared/services/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loading: boolean = true;
  dialogAlert: boolean = false;

  constructor(
    public alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.loading$.pipe(delay(0)).subscribe(resp => {
      this.loading = resp
    });
  }

}
