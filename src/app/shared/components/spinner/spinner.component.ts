import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Color } from '@type/color';

@Component({
  selector: 'ek-spinner',
  template: '',
  styleUrls: ['spinner.component.scss'],
  imports: [CommonModule],
})
export class SpinnerComponent {
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() color: Color | 'button-foreground' = 'primary';

  @HostBinding('class') get classAttribute(): string {
    return [this.size, this.color].join(' ');
  }
}
