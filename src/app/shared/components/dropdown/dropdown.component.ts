import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  QueryList,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { DropdownTriggerComponent } from './dropdown-trigger.component';
import { DropdownMenuItemComponent } from './dropdown-menu-item.component';

@Component({
  selector: 'div.dropdown',
  template: '<ng-content />',
})
export class DropdownComponent {
  public isOpen: WritableSignal<boolean> = signal(false);

  @ContentChild(DropdownTriggerComponent)
  dropdownTrigger!: DropdownTriggerComponent;
  @ContentChildren('div.dropdown__menu__item', { descendants: true })
  dropdownItems!: QueryList<DropdownMenuItemComponent>;

  @HostBinding('class.open')
  get openClassAttribute(): boolean {
    return this.isOpen();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!this.isOpen()) {
        return;
      }

      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.close();
      }
    });
  }

  ngAfterViewInit() {
    this.dropdownTrigger.clickEvent.subscribe(() => {
      this.toggle();
    });

    this.dropdownItems.map((dropdownItem: DropdownMenuItemComponent) => {
      dropdownItem.clickEvent.subscribe(() => {
        this.close();
      });
    });
  }

  public open(): void {
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  public toggle(): void {
    this.isOpen.set(!this.isOpen());
  }
}
