import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Color } from '@type/color';

import { ButtonContainerComponent } from './button-container.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'ek-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss'],
  imports: [CommonModule, ButtonContainerComponent, SpinnerComponent],
})
export class ButtonComponent {
  @Input() color: Color = 'primary';
  @Input() isFullWidth: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
}
