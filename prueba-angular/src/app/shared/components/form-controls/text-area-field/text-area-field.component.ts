import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  templateUrl: './text-area-field.component.html'
})
export class TextAreaFieldComponent {

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

    return '';
  }

}
