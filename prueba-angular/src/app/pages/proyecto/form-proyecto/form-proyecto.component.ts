import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, of, delay } from 'rxjs';
import { ProyectosService } from '../../../shared/services/proyectos.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.component.html'
})
export class FormProyectoComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isLoading: boolean = false;
  proyectoId!: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private proyectosService: ProyectosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      catchPhrase: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    })
  }

  getData() {
    this.alertService.showLoading();
    const sub = this.route.params.pipe(switchMap((params: any) => {
      this.proyectoId = params['id'] || 'nuevo';
      if (this.proyectoId && this.proyectoId !== 'nuevo') {
        return this.proyectosService.getById(this.proyectoId);
      } else {
        this.alertService.hideShowLoading();
        return of(null);
      }
    })).pipe(delay(500)).subscribe((data: any) => {
      if (data) {
        const datosPatchValue = data;
        datosPatchValue.catchPhrase = data.company.catchPhrase;
        this.form.patchValue(datosPatchValue);
        this.alertService.hideShowLoading();
      }
    }, err => {
      this.alertService.alert(err, 'Error');
      this.alertService.hideShowLoading();
      this.router.navigate(['/']);
    })

    this.unsubscribe.push(sub);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const form = this.form.value;
    if (this.proyectoId === 'nuevo') {
      const formSubscr = this.proyectosService.create(form).pipe(delay(500)).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/proyectos']);
      }, err => {
        this.alertService.alert(err, 'Error');
        this.isLoading = false;
      });
      this.unsubscribe.push(formSubscr);
    } else {
      const formSubscr = this.proyectosService.update(this.proyectoId, form).pipe(delay(500)).subscribe(() => {
        this.isLoading = false;
        this.router.navigate(['/proyectos']);
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
