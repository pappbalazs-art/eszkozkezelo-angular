import { CommonModule } from '@angular/common';
import {
  Component,
  HostBinding,
  Input,
  model,
  ModelSignal,
  OnInit,
} from '@angular/core';
import { timer } from 'rxjs';
import { SortDescriptor } from '@interfaces/sort-descriptor';
import { TableColumn } from '@interfaces/table';

import { ChevronDownIconComponent } from '@components/icons/chevron-down-icon.component';

@Component({
  selector: 'div.table__wrapper',
  templateUrl: 'table.component.html',
  imports: [CommonModule, ChevronDownIconComponent],
})
export class TableComponent implements OnInit {
  @Input({ required: true }) public columns!: Array<TableColumn>;
  public sortDescriptor: ModelSignal<SortDescriptor> = model<SortDescriptor>(
    {} as SortDescriptor
  );
  private animationsEnded: boolean = false;

  @HostBinding('class.animations-ended')
  get hasAnimationsEnded() {
    return this.animationsEnded;
  }

  ngOnInit(): void {
    timer(2500).subscribe(() => this.endAnimations());
  }

  private endAnimations() {
    this.animationsEnded = true;
  }

  public setSortDescriptor(key: string): void {
    const previousSortDescriptor = this.sortDescriptor();

    if (!this.animationsEnded) {
      this.endAnimations();
    }

    if (previousSortDescriptor.key === key) {
      if (previousSortDescriptor.direction === 'ascending') {
        this.sortDescriptor.set({
          key,
          direction: 'descending',
        });
      } else {
        this.sortDescriptor.set({
          key,
          direction: 'ascending',
        });
      }
    } else {
      this.sortDescriptor.set({
        key,
        direction: 'ascending',
      });
    }
  }
}
