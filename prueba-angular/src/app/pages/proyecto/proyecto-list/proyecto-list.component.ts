import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { ProyectosService } from '../../../shared/services/proyectos.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html'
})
export class ProyectoListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'acciones'];

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'titulo', label: 'Título', cell: (e: any) => e.name },
    { key: 'descripcion', label: 'Descripción', cell: (e: any) => e.company.catchPhrase }
  ];

  projectsList: any[] = [];

  private unsubscribe: Subscription[] = [];

  constructor(
    private alertService: AlertService,
    private proyectosService: ProyectosService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.alertService.showLoading();
    const subscr = this.proyectosService.getAll().pipe(delay(500)).subscribe(data => {
      this.projectsList = data;
      this.alertService.hideShowLoading();
    }, err => {
      this.alertService.alert(err, 'Error');
      this.alertService.hideShowLoading();
    });

    this.unsubscribe.push(subscr);
  }

  deleteItem(id: number) {
    this.alertService.confirm('¿Seguro que deseas eliminar este proyecto?', 'Confirmar')
      .subscribe((result) => {
        if (result) {
          this.alertService.showLoading();
          const subscr = this.proyectosService.delete(id).subscribe(() => {
            const index = this.projectsList.findIndex(item => item.id === id);
            if (index !== -1) {
              this.projectsList.splice(index, 1);
              this.projectsList = [...this.projectsList];
            }
            this.alertService.hideShowLoading();
          }, err => {
            this.alertService.alert(err, 'Error');
            this.alertService.hideShowLoading();
          });
          this.unsubscribe.push(subscr);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
