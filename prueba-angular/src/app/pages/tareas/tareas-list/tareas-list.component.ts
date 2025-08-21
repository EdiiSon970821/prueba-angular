import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { TareasService } from '../../../shared/services/tareas.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html'
})
export class TareasListComponent implements OnInit, OnDestroy {

  idProyecto!: string;
  tareasList: any[] = [];

  private unsubscribe: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const subscr = this.route.params.subscribe((params: any) => {
      this.idProyecto = params['proyectoId'];
    });

    this.unsubscribe.push(subscr);
    this.getData();
  }

  getData() {
    this.alertService.showLoading();
    const subscr = this.tareasService.getTareasByIdProyecto(this.idProyecto).pipe(delay(500)).subscribe((resp: any) => {
      this.tareasList = resp;
      this.alertService.hideShowLoading(); 
    }, err => {
      this.alertService.alert(err, 'Error');
      this.alertService.hideShowLoading(); 
    })

    this.unsubscribe.push(subscr);
  }

  deleteItem(id: number, index: number) {
    this.alertService.confirm('¿Seguro que deseas eliminar esta tarea?', 'Confirmar')
      .subscribe((result) => {
        if (result) {
          this.alertService.showLoading();
          const subscr = this.tareasService.delete(id).subscribe(() => {
            this.tareasList.splice(index, 1);
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
