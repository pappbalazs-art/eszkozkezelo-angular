import {
  Component,
  HostBinding,
  Input,
  model,
  ModelSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTypes } from '@type/input-types';

@Component({
  selector: 'ek-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class InputComponent {
  @Input() label: string = '';
  @Input({ required: true }) type!: InputTypes;
  @Input() isRequired: Boolean = false;
  @Input() isFullWidth: Boolean = true;
  public value: ModelSignal<string> = model<string>('');

  @HostBinding('class.required') get required() {
    return this.isRequired;
  }

  @HostBinding('class.full-width') get fullWidth() {
    return this.isFullWidth;
  }
}
