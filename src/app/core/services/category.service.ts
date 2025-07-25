import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Category, CategoryDraft } from '@interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private database: Firestore = inject(Firestore);
  private loading: WritableSignal<boolean> = signal(false);
  public categories: WritableSignal<Array<Category>> = signal([]);

  public async fetchAllCategories(
    withLoadingUpdates: boolean = true
  ): Promise<void> {
    if (withLoadingUpdates) {
      this.loading.set(true);
    }

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

    if (withLoadingUpdates) {
      this.loading.set(false);
    }

    this.categories.set(categories);
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

  public async createCategory(categoryDraft: CategoryDraft): Promise<void> {
    await addDoc(collection(this.database, 'categories'), categoryDraft);

    this.fetchAllCategories(false);
  }

  public async updateCategory(
    categoryId: string,
    categoryDraft: CategoryDraft
  ): Promise<void> {
    await updateDoc(doc(this.database, 'categories', categoryId), {
      name: categoryDraft.name,
    });

    this.fetchAllCategories(false);
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    await deleteDoc(doc(this.database, 'categories', categoryId));

    this.fetchAllCategories(false);
  }

  public isLoading(): boolean {
    return this.loading();
  }
}
