import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoListComponent } from './proyecto-list/proyecto-list.component';
import { FormProyectoComponent } from './form-proyecto/form-proyecto.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            component: ProyectoListComponent,
          },
          { path: 'form/nuevo', component: FormProyectoComponent },
          {
            path: 'form/:id',
            component: FormProyectoComponent,
          },
        ]
      },
    ]),
    SharedModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
  ],
  declarations: [ProyectoListComponent, FormProyectoComponent]
})
export class ProyectoModule { }
