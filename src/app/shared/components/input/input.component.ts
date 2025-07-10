import {
  Component,
  HostBinding,
  Input,
  model,
  ModelSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTypes } from '@type/input-types.type';

@Component({
  selector: 'div.input',
  templateUrl: 'input.component.html',
  imports: [CommonModule, FormsModule],
})
export class InputComponent {
  @Input() label: string = '';
  @Input({ required: true }) type!: InputTypes;

  @HostBinding('class.input--required')
  @Input()
  isRequired: boolean = false;

  @HostBinding('class.input--full-width')
  @Input()
  isFullWidth: boolean = true;

  public value: ModelSignal<string> = model<string>('');
}
