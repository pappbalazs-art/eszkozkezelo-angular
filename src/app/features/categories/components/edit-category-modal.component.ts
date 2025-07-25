import {
  Component,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { timer } from 'rxjs';
import { Category, CategoryDraft } from '@interfaces/category';
import { CategoryService } from '@services/category.service';
import { ModalService } from '@services/modal.service';

import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'div.modal.modal--edit-category',
  templateUrl: './edit-category-modal.component.html',
  imports: [InputComponent, ButtonComponent],
})
export class EditCategoryModalComponent implements OnInit, OnDestroy {
  private modalService: ModalService = inject(ModalService);
  private categoryService: CategoryService = inject(CategoryService);

  private MODAL_NAME: string = 'edit-category-modal';

  private category: Category | undefined;
  public categoryName: string = '';
  public isLoading: boolean = false;

  @Input() set selectedCategory(category: Category | undefined) {
    this.category = category;
    this.categoryName = category?.name || '';
  }

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

  public updateCategory($event: SubmitEvent): void {
    $event.preventDefault();

    if (!this.category) {
      console.error('There ar no selected category!');
      return;
    }

    const categoryDraft: CategoryDraft = {
      name: this.categoryName,
    };

    this.isLoading = true;
    this.categoryService
      .updateCategory(this.category.id, categoryDraft)
      .then(() => {
        this.modalService.closeModal(this.MODAL_NAME);

        timer(500).subscribe(() => (this.isLoading = false));
      });
  }
}
