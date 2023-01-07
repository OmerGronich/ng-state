import {
  ChangeDetectionStrategy,
  Component, Inject,
  inject,
  Injectable,
} from '@angular/core';
import { Store } from '@ng-state/state';
import {resourcePlugin} from "@ng-state/resource-plugin";

const initialState = { count: 0 };
type State = typeof initialState;

@Injectable()
export class Counter extends Store<State> {
  constructor() {
    super(initialState);
  }
}

@Injectable()
export class TestStore extends Store<State> {
  constructor() {
    super(initialState);

    this.use(resourcePlugin)
    this.customProperties.status
  }
}

@Component({
  selector: 'ng-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Counter],
})
export class AppComponent {
  store = inject(Counter);
}
