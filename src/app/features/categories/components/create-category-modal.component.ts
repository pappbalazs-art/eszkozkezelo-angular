import {
  Component,
  HostBinding,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { timer } from 'rxjs';
import { ModalService } from '@services/modal.service';
import { CategoryService } from '@services/category.service';

import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { CategoryDraft } from '@interfaces/category';

@Component({
  selector: 'div.modal.modal--create-category',
  templateUrl: './create-category-modal.component.html',
  imports: [InputComponent, ButtonComponent],
})
export class CreateCategoryModalComponent implements OnInit, OnDestroy {
  private modalService: ModalService = inject(ModalService);
  private categoryService: CategoryService = inject(CategoryService);

  private MODAL_NAME: string = 'create-category-modal';

  public categoryName: string = '';
  public isLoading: boolean = false;

  ngOnInit(): void {
    this.modalService.addModal(this.MODAL_NAME);
  }

  ngOnDestroy(): void {
    this.modalService.removeModal(this.MODAL_NAME);
  }

  @HostBinding('class.open')
  get isOpen(): boolean {
    return this.modalService.isModalOpen(this.MODAL_NAME);
  }

  public isFormValid(): boolean {
    return Boolean(this.categoryName);
  }

  public createCategory($event: SubmitEvent): void {
    $event.preventDefault();

    const categoryDraft: CategoryDraft = {
      name: this.categoryName,
    };

    this.isLoading = true;
    this.categoryService.createCategory(categoryDraft).then(() => {
      this.modalService.closeModal(this.MODAL_NAME);
      this.categoryName = '';

      timer(500).subscribe(() => (this.isLoading = false));
    });
  }
}
