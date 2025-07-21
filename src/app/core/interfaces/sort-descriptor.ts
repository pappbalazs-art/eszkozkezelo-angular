export type SortDirection = 'ascending' | 'descending';

export interface SortDescriptor {
  key: string;
  direction: SortDirection;
}
