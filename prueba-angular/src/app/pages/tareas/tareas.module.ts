import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasListComponent } from './tareas-list/tareas-list.component';
import { FormTareasComponent } from './form-tareas/form-tareas.component';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':proyectoId',
        children: [
          {
            path: '',
            component: TareasListComponent,
          },
          { path: 'form/nuevo', component: FormTareasComponent }, 
          {
            path: 'form/:id',
            component: FormTareasComponent,
          },
        ]
      },

    ]),
    SharedModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  declarations: [TareasListComponent, FormTareasComponent]
})
export class TareasModule { }
