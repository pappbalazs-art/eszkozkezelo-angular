import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'eszkozkezelo-5b8e1',
        appId: '1:151245176229:web:2cad79980ee482ba5a7c4c',
        storageBucket: 'eszkozkezelo-5b8e1.firebasestorage.app',
        apiKey: 'AIzaSyBxCn1ZR8ovCFZ0OQ9XJ1VBlYGKKz9fPlQ',
        authDomain: 'eszkozkezelo-5b8e1.firebaseapp.com',
        messagingSenderId: '151245176229',
        measurementId: 'G-KVB8BYPQ49',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
