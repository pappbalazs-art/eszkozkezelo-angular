import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Color } from '@interfaces/color';

@Component({
  selector: 'div.spinner',
  template: '',
  imports: [CommonModule],
})
export class SpinnerComponent {
  @HostBinding('size')
  @Input()
  size: 'normal' | 'small' | 'large' = 'normal';

  @HostBinding('color')
  @Input()
  color: Color | 'button-foreground' = 'primary';
}
