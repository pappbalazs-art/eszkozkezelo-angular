import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Color } from '@type/color';

@Component({
  selector: 'div.spinner',
  template: '',
  imports: [CommonModule],
})
export class SpinnerComponent {
  @HostBinding('size')
  @Input()
  size: 'normal' | 'small' = 'normal';

  @HostBinding('color')
  @Input()
  color: Color | 'button-foreground' = 'primary';
}
