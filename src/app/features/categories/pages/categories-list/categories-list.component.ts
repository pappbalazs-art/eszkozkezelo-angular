import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Category } from '@interfaces/category';
import { TableColumn } from '@interfaces/table';
import { SortDescriptor } from '@interfaces/sort-descriptor';
import { CategoryService } from '@services/category.service';
import { ModalService } from '@services/modal.service';
import { TableService } from '@services/table.service';

import { ModalsWrapper } from '@components/modal/modals-wrapper.component';
import { CreateCategoryModalComponent } from '@features/categories/components/create-category-modal.component';
import { EditCategoryModalComponent } from '@features/categories/components/edit-category-modal.component';
import { DeleteCategoryModalComponent } from '@features/categories/components/delete-category-modal.component';
import { TableComponent } from '@components/table/table.component';
import { InputComponent } from '@components/input/input.component';
import { ButtonComponent } from '@components/button/button.component';
import { DropdownComponent } from '@components/dropdown/dropdown.component';
import { DropdownTriggerComponent } from '@components/dropdown/dropdown-trigger.component';
import { DropdownMenuItemComponent } from '@components/dropdown/dropdown-menu-item.component';
import { PlusIconComponent } from '@components/icons/plus-icon.component';
import { EllipsisVerticalIconComponent } from '@components/icons/ellipsis-vertical-icon.component';
import { EditIconComponent } from '@components/icons/edit-icon.component';
import { DeleteIconComponent } from '@components/icons/delete-icon.component';

@Component({
  selector: 'section.section.section--categories-list',
  templateUrl: 'categories-list.component.html',
  imports: [
    CommonModule,
    ModalsWrapper,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
    DeleteCategoryModalComponent,
    TableComponent,
    InputComponent,
    ButtonComponent,
    DropdownComponent,
    DropdownTriggerComponent,
    DropdownMenuItemComponent,
    PlusIconComponent,
    EllipsisVerticalIconComponent,
    EditIconComponent,
    DeleteIconComponent,
  ],
})
export class CategoriesListPageComponent {
  private categoriesService: CategoryService = inject(CategoryService);
  private modalService: ModalService = inject(ModalService);
  private tableService: TableService = inject(TableService);

  public searchParam: WritableSignal<string> = signal('');
  public selectedCategory: WritableSignal<Category | undefined> =
    signal(undefined);

  private categories: WritableSignal<Array<Category>> =
    this.categoriesService.categories;
  private filteredItems: Signal<Array<Category>> = computed(() =>
    this.tableService.filterItems<Category>(
      this.categories(),
      'name',
      this.searchParam()
    )
  );
  public sortedItems: Signal<Array<Category>> = computed(() =>
    this.tableService.sortItems<Category>(
      this.filteredItems(),
      this.sortDescriptor()
    )
  );
  public sortDescriptor: WritableSignal<SortDescriptor> = signal({
    key: 'name',
    direction: 'ascending',
  });

  public tableColumns: Array<TableColumn> = [
    {
      key: 'name',
      label: 'Megnevezés',
    },
    {
      key: 'numberOfItems',
      label: 'Eszközök száma',
    },
    {
      key: 'actions',
    },
  ];

  constructor() {
    this.categoriesService.fetchAllCategories();
  }

  public isLoading(): boolean {
    return this.categoriesService.isLoading();
  }

  public openCreateCategoryModal(): void {
    this.modalService.openModal('create-category-modal');
  }

  public openEditCategoryModal(selectedCategory: Category): void {
    this.selectedCategory.set(selectedCategory);
    this.modalService.openModal('edit-category-modal');
  }

  public openDeleteCategoryModal(selectedCategory: Category): void {
    this.selectedCategory.set(selectedCategory);
    this.modalService.openModal('delete-category-modal');
  }
}
