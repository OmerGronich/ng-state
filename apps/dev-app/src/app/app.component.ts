import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { TodoStoreService } from './todo-store.service';

@Component({
  selector: 'ng-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStoreService],
})
export class AppComponent implements OnInit {
  todoStore = inject(TodoStoreService);

  ngOnInit() {
    this.todoStore.init();
  }
}
