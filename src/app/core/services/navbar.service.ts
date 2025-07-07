import { Injectable, OnDestroy, signal, WritableSignal } from '@angular/core';
import { fromEvent, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService implements OnDestroy {
  public isMenuOpen: WritableSignal<boolean> = signal(false);
  private resizeEvent$: Observable<Event> = fromEvent<Event>(
    window,
    'resize'
  ).pipe(tap(() => this.closeMenu()));
  private windowSubscription?: Subscription;

  constructor() {
    this.windowSubscription = this.resizeEvent$.subscribe();
  }

  ngOnDestroy(): void {
    this.windowSubscription?.unsubscribe();
  }

  public openMenu(): void {
    this.isMenuOpen.set(true);
  }

  public closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  public toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
