import { NgStateCustomProperties, State, Store } from '@ng-state/state';

type Status = 'idle' | 'loading' | 'error' | 'success';

declare module '@ng-state/state' {
  export interface NgStateCustomProperties {
    status: 'moshe';
  }
}

export function resourcePlugin<T extends object>(
  store: Store<T>
): NgStateCustomProperties {
  return { status: 'moshe' };
}
