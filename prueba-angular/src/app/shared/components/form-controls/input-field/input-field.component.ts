import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html'
})
export class InputFieldComponent {

  @Input() control!: FormControl | any;
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';

  getErrorMessage(): string {
    if (!this.control) return '';

    if (this.control.hasError('required')) return 'Campo requerido';
    if (this.control.hasError('minlength')) {
      const min = this.control.getError('minlength').requiredLength;
      return `Mínimo ${min} caracteres`;
    }
    if (this.control.hasError('maxlength')) {
      const max = this.control.getError('maxlength').requiredLength;
      return `Máximo ${max} caracteres`;
    }
    if (this.control.hasError('email')) return 'Email inválido';

    return '';
  }

}
