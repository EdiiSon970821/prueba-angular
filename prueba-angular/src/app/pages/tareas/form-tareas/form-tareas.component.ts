import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay, of, switchMap } from 'rxjs';
import { TareasService } from '../../../shared/services/tareas.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-form-tareas',
  templateUrl: './form-tareas.component.html'
})
export class FormTareasComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isLoading: boolean = false;
  proyectoId!: string;
  tareaId!: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      completed: [false, [Validators.required]],
    })
  }

  getData() {
    this.alertService.showLoading();
    const sub = this.route.params.pipe(switchMap((params: any) => {
      this.tareaId = params['id'] || 'nuevo';
      this.proyectoId = params['proyectoId'];
      if (this.tareaId && this.tareaId !== 'nuevo') {
        return this.tareasService.getById(this.tareaId);
      } else {
        this.alertService.hideShowLoading();
        return of(null);
      }
    })).pipe(delay(500)).subscribe((data: any) => {
      if (data) {
        this.form.patchValue(data);
      }
      this.alertService.hideShowLoading();
    }, err => {
      this.alertService.alert(err, 'Error en el servicio');
      this.alertService.hideShowLoading();
      this.router.navigate(['/']);
    })

    this.unsubscribe.push(sub);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const form = this.form.value;
    form.userId = +this.proyectoId;
    if (this.tareaId === 'nuevo') {
      const formSubscr = this.tareasService.create(form).pipe(delay(500)).subscribe(() => {
        this.isLoading = false;
        const alertSubscr = this.alertService.alert('Tarea creada exitosamente', 'Éxito').subscribe(() => {
          this.router.navigate(['/tareas', this.proyectoId]);
        })
        this.unsubscribe.push(alertSubscr);
      }, err => {
        this.alertService.alert(err, 'Error');
        this.isLoading = false;
      });
      this.unsubscribe.push(formSubscr);
    } else {
      const formSubscr = this.tareasService.update(this.tareaId, form).pipe(delay(500)).subscribe(() => {
        this.isLoading = false;
        const alertSubscr = this.alertService.alert('Tarea editada exitosamente', 'Éxito').subscribe(() => {
          this.router.navigate(['/tareas', this.proyectoId]);
        })
        this.unsubscribe.push(alertSubscr);
      }, err => {
         this.alertService.alert(err, 'Error');
        this.isLoading = false;
      });
      this.unsubscribe.push(formSubscr);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
