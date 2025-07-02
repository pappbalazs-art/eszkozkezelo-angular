import { Component, computed, contentChild, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContainerComponent } from './card-container.component';
import { CardHeaderComponent } from './card-header.component';
import { CardTitleComponent } from './card-title.component';

@Component({
  selector: 'ek-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  imports: [CommonModule, CardContainerComponent, CardHeaderComponent],
})
export class CardComponent {
  title: Signal<CardTitleComponent | undefined> =
    contentChild(CardTitleComponent);
  hasTitle: Signal<Boolean> = computed<Boolean>(() => Boolean(this.title()));
}
