import {State} from './state';
import {map, Observable} from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateCustomState {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateActions {
}

export type CombinedState<T> = T & NgStateCustomState


export class Store<T extends object> extends State<T> {
  #customState!: NgStateCustomState;
  #customActions!: NgStateActions;

  get actions() {
    return this.#customActions
  }

  constructor(override readonly initialState: T) {
    super(initialState);
  }

  update(newValue: Partial<CombinedState<T>>) {
    this.set({
      ...this.get(),
      ...newValue,
    });
  }

  override get(): CombinedState<T> {
    return super.get() as CombinedState<T>
  }

  select<K extends keyof CombinedState<T>>(key: K): () => CombinedState<T>[K] {
    return () => this.get()[key]
  }

  override asObservable(): Observable<CombinedState<T>> {
    return super.asObservable() as Observable<CombinedState<T>>;
  }

  use(cb: (store: Store<T>) => NgStateActions) {
    const actions = cb(this);
    this.#customActions = {...this.#customActions, ...actions};
  }
}

export const createComponentStore = <T extends object>(initialState: T) => {
  return new Store(initialState);
};
