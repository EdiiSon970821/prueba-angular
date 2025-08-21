import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() text: string = '';
  @Input() type: string = '';
  @Input() rutaUrl: string = '';

}
