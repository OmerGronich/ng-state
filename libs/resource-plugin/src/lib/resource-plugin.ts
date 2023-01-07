import { State, Store } from '@ng-state/state';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function resourcePlugin<T extends object>(
  store: Store<T>
): State<{
  status: Status;
}> {
  return new State({ status: 'idle' });
}
