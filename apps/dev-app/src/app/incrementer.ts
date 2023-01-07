import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Counter } from './app.component';

@Component({
  selector: 'incrementer',
  template: `<button (click)="store.set({ count: store.get().count + 1 })">
    +
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncrementerComponent {
  store = inject(Counter);

  constructor() {
  }
}
