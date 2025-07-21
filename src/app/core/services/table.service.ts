import { Injectable } from '@angular/core';
import { SortDescriptor } from '@interfaces/sort-descriptor';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  public filterItems<T>(
    items: Array<T>,
    key: string,
    searchParam: string
  ): Array<T> {
    const filteredItems: Array<T> = items.filter((item: T): boolean => {
      return new String(item[key as keyof T])
        .toString()
        .toLowerCase()
        .includes(searchParam.toLowerCase());
    });

    return filteredItems;
  }

  public sortItems<T>(
    items: Array<T>,
    sortDescriptor: SortDescriptor
  ): Array<T> {
    return [...items].sort((a: T, b: T): number => {
      const first: string = new String(
        a[sortDescriptor.key as keyof T]
      ).toString();
      const second: string = new String(
        b[sortDescriptor.key as keyof T]
      ).toString();
      const cmp = first.toLowerCase().localeCompare(second.toLowerCase());

      return sortDescriptor.direction === 'ascending' ? cmp : -cmp;
    });
  }
}
