import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { Modal } from '@interfaces/modal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: WritableSignal<Array<Modal>> = signal<Array<Modal>>([]);

  private hasModalWithGivenName(modalName: string): boolean {
    return (
      this.modals().filter((modal: Modal): boolean => {
        return modal.name === modalName;
      }).length !== 0
    );
  }

  public addModal(modalName: string): boolean {
    if (this.hasModalWithGivenName(modalName)) {
      console.error(
        "There are already a modal with the name '" + modalName + "'!"
      );

      return false;
    }

    this.modals().push({
      name: modalName,
      isOpen: false,
    });

    return true;
  }

  public removeModal(modalName: string): boolean {
    if (!this.hasModalWithGivenName(modalName)) {
      console.error("There are no modal with the name '" + modalName + "'!");

      return false;
    }

    this.modals.set(
      this.modals().filter((modal: Modal): boolean => {
        return modal.name !== modalName;
      })
    );

    return true;
  }

  public getModals(): Array<Modal> {
    return this.modals();
  }

  public getModal(modalName: string): Modal | undefined {
    return this.modals().find((modal: Modal): boolean => {
      return modal.name === modalName;
    });
  }

  public isModalOpen(modalName: string): boolean {
    if (!this.hasModalWithGivenName(modalName)) {
      console.error("There are no modal with the name '" + modalName + "'!");

      return false;
    }

    const modal = this.getModal(modalName);

    if (!modal) {
      return false;
    }

    return modal.isOpen;
  }

  public openModal(modalName: string): boolean {
    if (!this.hasModalWithGivenName(modalName)) {
      console.error("There are no modal with the name '" + modalName + "'!");

      return false;
    }

    this.modals.set(
      this.modals().map((modal: Modal): Modal => {
        if (modal.name !== modalName) {
          return modal;
        }

        return {
          ...modal,
          isOpen: true,
        };
      })
    );

    return true;
  }

  public closeModal(modalName: string): boolean {
    if (!this.hasModalWithGivenName(modalName)) {
      console.error("There are no modal with the name '" + modalName + "'!");

      return false;
    }

    this.modals.set(
      this.modals().map((modal: Modal): Modal => {
        if (modal.name !== modalName) {
          return modal;
        }

        return {
          ...modal,
          isOpen: false,
        };
      })
    );

    return true;
  }

  public closeCurrentModal(): void {
    this.modals.set(
      this.modals().map((modal: Modal): Modal => {
        if (!modal.isOpen) {
          return modal;
        }

        return {
          ...modal,
          isOpen: false,
        };
      })
    );
  }
}
