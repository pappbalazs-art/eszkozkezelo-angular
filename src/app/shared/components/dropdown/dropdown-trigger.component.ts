import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'div.dropdown__trigger',
  template: '<ng-content />',
})
export class DropdownTriggerComponent {
  @Output() clickEvent: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  @HostListener('click')
  private handleClick(): void {
    this.clickEvent.emit();
  }
}
