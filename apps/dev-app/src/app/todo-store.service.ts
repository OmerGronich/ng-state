import { Injectable } from '@angular/core';
import { computed, Store } from '@ng-state/state';
import { HttpClient } from '@angular/common/http';
import { delay, startWith } from 'rxjs';
import {resourcePlugin, Status} from '@ng-state/resource-plugin';

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const initialState = {
  todos: [] as Todo[],
};
type TodoState = typeof initialState;

@Injectable({
  providedIn: 'root',
})
export class TodoStoreService extends Store<TodoState> {

  get status(): Status {
    return this.actions.getStatus();
  }

  constructor(private http: HttpClient) {
    super(initialState);
    this.use(resourcePlugin);
  }

  init() {
    this.getTodos();
  }

  private getTodos() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(delay(1000), this.actions.trackStatus(), startWith([]))
      .subscribe((todos) => {
        this.set({ todos });
      });
  }
}
