import { effect as _effect, signal, Signal, computed as _computed } from 'usignal';
import { Observable } from 'rxjs';
import {ChangeDetectorRef, inject, ViewRef} from "@angular/core";

export const effect = _effect;
export const computed = _computed;

export class NgSignal<T> {
  #view = inject(ChangeDetectorRef) as ViewRef;
  #signal: Signal<T>;
  constructor(initialValue: T) {
    this.#signal = signal(initialValue);

    const dispose = effect(() => {
      this.get(); // this value read triggers the effect
      this.#view.markForCheck();
    });

    setTimeout(() => {
      this.#view.onDestroy(() => {
        dispose();
      });
    });
  }

  get() {
    return this.#signal.value;
  }

  set(newValue: T) {
    this.#signal.value = newValue;
  }

  asObservable(): Observable<T> {
    return new Observable<T>((subscriber) => {
      const dispose = effect(() => {
        subscriber.next(this.get());
      });

      return () => {
        dispose();
      };
    });
  }
}
