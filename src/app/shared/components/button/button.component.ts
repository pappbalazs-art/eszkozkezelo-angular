import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Color } from '@type/color';

import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'button.button',
  templateUrl: 'button.component.html',
  imports: [CommonModule, SpinnerComponent],
})
export class ButtonComponent {
  @HostBinding('attr.color')
  @Input()
  color: Color = 'primary';

  @HostBinding('class.button--full-width')
  @Input()
  isFullWidth: boolean = true;

  @HostBinding('disabled')
  @Input()
  isDisabled: boolean = false;

  @Input() isLoading: boolean = false;
}
