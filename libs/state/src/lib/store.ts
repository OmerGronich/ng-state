import { NgSignal } from './state';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateCustomState {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateActions {}

export type CombinedState<T> = T & NgStateCustomState;

export class Store<T extends object> extends NgSignal<T> {
  actions!: NgStateActions;

  constructor(initialState: T) {
    super(initialState);
  }

  override get(): CombinedState<T> {
    return super.get() as CombinedState<T>;
  }

  update(newValue: Partial<CombinedState<T>>) {
    this.set({ ...this.get(), ...newValue });
  }

  override asObservable(): Observable<CombinedState<T>> {
    return super.asObservable() as Observable<CombinedState<T>>;
  }

  use(cb: (store: Store<T>) => NgStateActions) {
    const actions = cb(this);
    this.actions = { ...this.actions, ...actions };
  }
}
