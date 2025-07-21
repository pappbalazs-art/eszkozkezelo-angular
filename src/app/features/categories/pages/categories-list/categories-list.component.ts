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
import { TableService } from '@services/table.service';

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
  private tableService: TableService = inject(TableService);
  public searchParam: WritableSignal<string> = signal('');
  public categories: WritableSignal<Array<Category>> = signal([]);
  public filteredItems: Signal<Array<Category>> = computed(() =>
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
    this.categoriesService
      .fetchAllCategories()
      .then((categories: Array<Category>): void => {
        this.categories.set(categories);
      });
  }

  public isLoading(): boolean {
    return this.categoriesService.isLoading();
  }
}
