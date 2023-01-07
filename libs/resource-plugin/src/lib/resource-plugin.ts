import {NgStateActions, Store} from '@ng-state/state';
import {catchError, Observable, tap} from 'rxjs';

export type Status = 'idle' | 'loading' | 'error' | 'success';

declare module '@ng-state/state' {
  export interface NgStateCustomState {
    status: Status;

  }

  export interface NgStateActions {
    trackStatus: () => <T>(arg: Observable<T>) => Observable<T>
  }
}

// export let trackStatus: () => <ObsT>(arg$: Observable<ObsT>) => Observable<ObsT>;

export function resourcePlugin<T extends object>(
  store: Store<T>
): NgStateActions {
  store.set({...store.get(), status: 'idle'});
  const trackStatus = () => <ObsT>(arg$: Observable<ObsT>) => {
    store.set({...store.get(), status: 'loading'})
    return arg$.pipe(
      tap(() => {
        store.set({...store.get(), status: 'success'})
      }),
      catchError((err) => {
        store.set({...store.get(), status: 'error'})
        throw err;
      })
    )
  }

  return {
    trackStatus
  };
}
