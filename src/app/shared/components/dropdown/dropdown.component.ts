import {
  Component,
  contentChild,
  contentChildren,
  ElementRef,
  HostBinding,
  Renderer2,
  Signal,
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

  dropdownTrigger: Signal<DropdownTriggerComponent> = contentChild.required(
    DropdownTriggerComponent
  );
  dropdownItems: Signal<readonly DropdownMenuItemComponent[]> = contentChildren(
    DropdownMenuItemComponent,
    {
      descendants: true,
    }
  );

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
    this.dropdownTrigger().clickEvent.subscribe(() => {
      this.toggle();
    });

    this.dropdownItems().map((dropdownItem: DropdownMenuItemComponent) => {
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
