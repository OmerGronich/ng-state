import { State } from './state';

export interface NgStateCustomProperties {

}

export interface NgStatePlugin<T extends object> {
  (store: Store<T>): Partial<
    NgStateCustomProperties
  > | void
}

export class Store<T extends object> extends State<T> {
  customProperties: NgStateCustomProperties = {};
  constructor(override readonly initialState: T) {
    super(initialState);
  }

  update(newValue: Partial<T>) {
    this.set({
      ...this.get(),
      ...newValue,
    });
  }

  use(cb: (store: Store<T>) => object) {
    this.customProperties = { ...cb(this) };
  }
}

export const createComponentStore = <T extends object>(initialState: T) => {
  return new Store(initialState);
};
