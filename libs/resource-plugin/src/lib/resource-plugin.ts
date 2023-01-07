import {NgStateCustomProperties, State, Store} from '@ng-state/state';
import {catchError, Observable, tap} from 'rxjs';

export type Status = 'idle' | 'loading' | 'error' | 'success';

declare module '@ng-state/state' {
  export interface NgStateCustomProperties {
    status: () => Status;
    setStatus: (status: Status) => void;
    trackStatus: () => <T>(arg: Observable<T>) => Observable<T>
  }
}

export function resourcePlugin<T extends object>(
  store: Store<T>
): NgStateCustomProperties {
  const status = new State<Status>('idle');
  return {
    status: () => status.get(),
    setStatus: (s: Status) => {
      status.set(s)
    },
    trackStatus: () => <ObsT>(arg$: Observable<ObsT>) => {
      status.set('loading');
      return arg$.pipe(
        tap(() => {
          status.set('success');
        }),
        catchError((err) => {
          status.set(('error'));
          throw err;
        })
      )
    }
  };
}
