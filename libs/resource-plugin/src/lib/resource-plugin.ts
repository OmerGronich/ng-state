import { NgStateActions, Store } from '@ng-state/state';
import { catchError, Observable, tap } from 'rxjs';

export type Status = 'idle' | 'loading' | 'error' | 'success';

declare module '@ng-state/state' {
  export interface NgStateCustomState {
    status: Status;
  }

  export interface NgStateActions {
    trackStatus: () => <T>(arg: Observable<T>) => Observable<T>;
  }
}

export function resourcePlugin<T extends object>(
  store: Store<T>
): NgStateActions {
  store.value = { ...store.value, status: 'idle' };
  const trackStatus =
    () =>
    <ObsT>(arg$: Observable<ObsT>) => {
      store.value = { ...store.value, status: 'loading' };
      return arg$.pipe(
        tap(() => {
          store.value = { ...store.value, status: 'success' };
        }),
        catchError((err) => {
          store.value = { ...store.value, status: 'error' };
          throw err;
        })
      );
    };

  return {
    trackStatus,
  };
}
