import { effect as _effect, signal, Signal, computed as _computed } from 'usignal';
import { Observable } from 'rxjs';
import {ChangeDetectorRef, inject, ViewRef} from "@angular/core";

export const effect = _effect;
export const computed = _computed;

export class NgSignal<T> extends Signal<T>{
  #view = inject(ChangeDetectorRef) as ViewRef;
  constructor(initialValue: T) {
    super(initialValue);

    const dispose = effect(() => {
      this.value; // this value read triggers the effect
      this.#view.markForCheck();
    });

    setTimeout(() => {
      this.#view.onDestroy(() => {
        dispose();
      });
    });
  }

  asObservable(): Observable<T> {
    return new Observable<T>((subscriber) => {
      const dispose = effect(() => {
        subscriber.next(this.value);
      });

      return () => {
        dispose();
      };
    });
  }
}

export class State<T> {
  #signal: Signal<T>;
  #view = inject(ChangeDetectorRef) as ViewRef;

  constructor(readonly initialState: T) {
    this.#signal = signal(this.initialState);

    const dispose = effect(() => {
      console.log('this.get():', this.get());
      this.#view.markForCheck();
    });

    setTimeout(() => {
      this.#view.onDestroy(() => {
        dispose();
      });
    });
  }
  get(): T {
    return this.#signal.value;
  }
  set(newValue: T): void {
    this.#signal.value = newValue;
  }

  asObservable(): Observable<T> {
    return new Observable<T>((subscriber) => {
      const dispose = effect(() => {
        subscriber.next(this.#signal.value);
      });

      return () => {
        dispose();
      };
    });
  }
}

export const createState = <T>(initialState: T) => {
  return new State(initialState);
}
