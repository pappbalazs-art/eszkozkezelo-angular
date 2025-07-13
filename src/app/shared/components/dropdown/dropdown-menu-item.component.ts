import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'li.dropdown__menu__item',
  template: '<ng-content />',
})
export class DropdownMenuItemComponent {
  @Output() clickEvent: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @HostListener('click')
  private handleClick(): void {
    this.clickEvent.emit();
  }
}
