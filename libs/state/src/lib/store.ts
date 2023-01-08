import { NgSignal, State } from './state';
import { map, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateCustomState {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateActions {}

export type CombinedState<T> = T & NgStateCustomState;

export class Store<T extends object> extends NgSignal<T> {
  #customState!: NgStateCustomState;
  #customActions!: NgStateActions;

  get actions() {
    return this.#customActions;
  }

  constructor(initialState: T) {
    super(initialState);
  }

  get(): CombinedState<T> {
    return this.value as CombinedState<T>;
  }

  update(newValue: Partial<CombinedState<T>>) {
    this.value = { ...this.value, ...newValue };
  }

  override asObservable(): Observable<CombinedState<T>> {
    return super.asObservable() as Observable<CombinedState<T>>;
  }

  use(cb: (store: Store<T>) => NgStateActions) {
    const actions = cb(this);
    this.#customActions = { ...this.#customActions, ...actions };
  }
}

export const createComponentStore = <T extends object>(initialState: T) => {
  return new Store(initialState);
};
