import {ChangeDetectionStrategy, Component, inject, OnInit,} from '@angular/core';
import {TodoStoreService} from './todo-store.service';
import {Status} from "@ng-state/resource-plugin";

@Component({
  selector: 'ng-state-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoStoreService]
})
export class AppComponent implements OnInit{
  todoStore = inject(TodoStoreService)

  get status(): Status {
    return this.todoStore.get().status
  }

  ngOnInit() {
    this.todoStore.init()
  }

}
