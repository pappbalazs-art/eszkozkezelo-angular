import {
  Component,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { timer } from 'rxjs';
import { ModalService } from '@services/modal.service';
import { CategoryService } from '@services/category.service';

import { ButtonComponent } from '@components/button/button.component';
import { Category } from '@interfaces/category';

@Component({
  selector: 'div.modal.modal--delete-category',
  templateUrl: './delete-category-modal.component.html',
  imports: [ButtonComponent],
})
export class DeleteCategoryModalComponent implements OnInit, OnDestroy {
  private modalService: ModalService = inject(ModalService);
  private categoryService: CategoryService = inject(CategoryService);

  private MODAL_NAME: string = 'delete-category-modal';

  @Input() category: Category | undefined;
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

  public deleteCategory(): void {
    if (!this.category) {
      console.error('There are no selected category!');
      return;
    }

    this.isLoading = true;
    this.categoryService.deleteCategory(this.category.id).then(() => {
      this.modalService.closeModal(this.MODAL_NAME);
      timer(500).subscribe(() => (this.isLoading = false));
    });
  }
}
