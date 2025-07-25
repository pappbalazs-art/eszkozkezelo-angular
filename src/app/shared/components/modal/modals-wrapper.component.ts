import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'div.modals__wrapper',
  template: '<ng-content />',
})
export class ModalsWrapper {
  private modalService: ModalService = inject(ModalService);

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  public onClick($event: MouseEvent): void {
    if ($event.target === this.elementRef.nativeElement) {
      this.modalService.closeCurrentModal();
    }
  }
}
