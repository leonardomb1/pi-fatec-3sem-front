import { Component, ContentChild, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() type: 'column' | 'inline' = 'column';
  @Input() id: string = '';

  @ContentChild('input') input: any;

  get inputId(): string {
    return this.id || this.label.toLowerCase().replace(/ /g, '-');
  }
}
