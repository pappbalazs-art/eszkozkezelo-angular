import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from '@angular/fire/firestore';
import { Category } from '@interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private database: Firestore = inject(Firestore);
  private loading: WritableSignal<boolean> = signal(false);

  public async fetchAllCategories(): Promise<Array<Category>> {
    this.loading.set(true);

    const categoriesSnapshot: QuerySnapshot = await getDocs(
      collection(this.database, 'categories')
    );
    const categoriesDocs: Array<QueryDocumentSnapshot> =
      categoriesSnapshot.docs;
    const categories = await Promise.all(
      categoriesDocs.map(
        async (category: QueryDocumentSnapshot): Promise<Category> => {
          const categoryData: DocumentData = category.data();
          const numberOfItemsInCategory: number =
            await this.fetchNumberOfItemsInCategory(category.id);

          return {
            id: category.id,
            name: categoryData['name'],
            numberOfItems: numberOfItemsInCategory,
          };
        }
      )
    );

    this.loading.set(false);

    return categories;
  }

  private async fetchNumberOfItemsInCategory(
    categoryId: string
  ): Promise<number> {
    const itemsRef: CollectionReference = collection(this.database, 'items');
    const itemsQuery: Query = query(
      itemsRef,
      where('category_uid', '==', categoryId)
    );
    const itemsSnapshot: QuerySnapshot = await getDocs(itemsQuery);
    const numberOfItemsInCategory: number = itemsSnapshot.docs.length;

    return numberOfItemsInCategory;
  }

  public isLoading(): boolean {
    return this.loading();
  }
}
