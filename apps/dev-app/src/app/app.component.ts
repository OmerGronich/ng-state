import {ChangeDetectionStrategy, Component, Injectable,} from '@angular/core';
import {Store} from '@ng-state/state';
import {resourcePlugin, Status} from "@ng-state/resource-plugin";
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs';

const initialState = {count: 0};
type LocalState = typeof initialState;



@Injectable()
export class TestStore extends Store<LocalState> {
  constructor(private http: HttpClient) {
    super(initialState);

    this.use(resourcePlugin)
    this.http.get('https://jsonplaceholder.typicode.com/todos').pipe(
      delay(2500),
      this.get().trackStatus(),
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

  get status(): Status {
    return this.store.get().status()
  }

  constructor(public store: TestStore) {
  }

}
