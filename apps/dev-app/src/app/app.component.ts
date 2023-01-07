import {ChangeDetectionStrategy, Component, Injectable,} from '@angular/core';
import {State, Store} from '@ng-state/state';
import {resourcePlugin, Status} from "@ng-state/resource-plugin";
import {HttpClient} from '@angular/common/http';
import {effect, signal} from 'usignal';
import {delay} from 'rxjs';

const initialState = {count: 0};
type LocalState = typeof initialState;

@Injectable()
export class Counter extends Store<LocalState> {
  constructor() {
    super(initialState);
  }
}

@Injectable()
export class TestStore extends Store<LocalState> {
  constructor(private http: HttpClient) {
    super(initialState);

    this.use(resourcePlugin)
    this.customProperties.status
    this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      delay(2500),
      this.customProperties.trackStatus(),
    ).subscribe(console.log)
  }

}

@Component({
  selector: 'ng-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TestStore],
})
export class AppComponent {

  x = new State('yosi');

  get status(): Status {
    return this.store.customProperties.status()
  }

  constructor(public store: TestStore) {
  }

}
