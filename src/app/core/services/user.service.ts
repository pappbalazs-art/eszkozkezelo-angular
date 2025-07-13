import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  collection,
  CollectionReference,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DocumentData } from '@angular/fire/compat/firestore';
import { User } from 'app/core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private database: Firestore = inject(Firestore);
  private ready: WritableSignal<boolean> = signal(false);
  private user: WritableSignal<User | undefined> = signal(undefined);

  public async fetchUser(userId: string | undefined): Promise<void> {
    this.ready.set(false);

    if (!userId) {
      this.ready.set(true);

      return undefined;
    }

    const usersRef: CollectionReference = collection(this.database, 'users');
    const userQuery: Query = query(usersRef, where('user_uid', '==', userId));
    const userSnapshot: QuerySnapshot = await getDocs(userQuery);
    const userDoc: QueryDocumentSnapshot = userSnapshot.docs[0];
    const userData: DocumentData = userDoc.data();

    this.user.set({
      id: userDoc.id,
      name: userData['name'],
      email: userData['email'],
      neptun_code: userData['neptun_code'],
      role: userData['role'],
      status: userData['status'],
      user_uid: userData['user_uid'],
    });
    this.ready.set(true);
  }

  public getUser(): User | undefined {
    return this.user();
  }

  public isReady(): boolean {
    return this.ready();
  }
}
