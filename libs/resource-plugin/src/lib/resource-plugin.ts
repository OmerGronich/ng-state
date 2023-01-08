import { NgSignal, NgStateActions, Store } from '@ng-state/state';
import { catchError, Observable, tap } from 'rxjs';

export type Status = 'idle' | 'loading' | 'error' | 'success';

declare module '@ng-state/state' {
  export interface NgStateCustomState {
    status: Status;
  }

  export interface NgStateActions {
    trackStatus: () => <T>(arg: Observable<T>) => Observable<T>;
    setStatus: (status: Status) => void;
    getStatus: () => Status;
  }
}

export function resourcePlugin<T extends object>(): NgStateActions {
  const signal = new NgSignal<Status>('idle');
  const trackStatus =
    () =>
    <ObsT>(arg$: Observable<ObsT>) => {
      signal.set('loading');
      return arg$.pipe(
        tap(() => {
          signal.set('success');
        }),
        catchError((err) => {
          signal.set('error');
          throw err;
        })
      );
    };

  return {
    trackStatus,
    getStatus: () => signal.get(),
    setStatus: (s: Status) => signal.set(s),
  };
}
