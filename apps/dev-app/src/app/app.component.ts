import {ChangeDetectionStrategy, Component, inject,} from '@angular/core';
import {TodoStoreService} from './todo-store.service';

@Component({
  selector: 'ng-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStoreService]
})
export class AppComponent {
  todoStore = inject(TodoStoreService);
  todos = this.todoStore.filteredTodos;
  status = this.todoStore.select('status');


  ngOnInit() {
    this.todoStore.init()
  }

}
