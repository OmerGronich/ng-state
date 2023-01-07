import {State} from './state';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NgStateCustomProperties {

}

export class Store<T extends object> extends State<T> {
  customProperties!: NgStateCustomProperties;

  constructor(override readonly initialState: T) {
    super(initialState);
  }

  update(newValue: Partial<T>) {
    this.set({
      ...this.get(),
      ...newValue,
    });
  }

  // override get(): Store<T> & NgStateCustomProperties {
  //   return {...super.get(), ...this.customProperties}
  // }

  use(cb: (store: Store<T>) => NgStateCustomProperties) {
    const plugin = cb(this);
    // Object.assign(this, plugin);
    this.customProperties = {...this.customProperties, ...plugin}
  }
}

export const createComponentStore = <T extends object>(initialState: T) => {
  return new Store(initialState);
};
