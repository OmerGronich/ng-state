import {State} from './state';
import {map, Observable} from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateCustomProperties {

}

export type CombinedState<T> = T & NgStateCustomProperties

export class Store<T extends object> extends State<T> {
  #customProperties!: NgStateCustomProperties;

  constructor(override readonly initialState: T) {
    super(initialState);
  }

  update(newValue: Partial<T>) {
    this.set({
      ...this.get(),
      ...newValue,
    });
  }

  override get(): CombinedState<T> {
    return {...super.get(), ...this.#customProperties}
  }

  override asObservable(): Observable<CombinedState<T>> {
    return super.asObservable().pipe(map((storeState: T) => ({...storeState, ...this.#customProperties})));
  }

  use(cb: (store: Store<T>) => NgStateCustomProperties) {
    const plugin = cb(this);
    this.#customProperties = {...this.#customProperties, ...plugin}
  }
}

export const createComponentStore = <T extends object>(initialState: T) => {
  return new Store(initialState);
};
