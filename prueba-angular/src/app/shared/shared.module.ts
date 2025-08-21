import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from './components/form-controls/input-field/input-field.component';
import { TextAreaFieldComponent } from './components/form-controls/text-area-field/text-area-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SwitchComponent } from './components/form-controls/switch/switch.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ButtonComponent } from './components/buttons/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  declarations: [InputFieldComponent, TextAreaFieldComponent, SwitchComponent, ButtonComponent],
  exports: [
    InputFieldComponent,
    TextAreaFieldComponent,
    SwitchComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
