import {Injectable} from '@angular/core';
import {computed, Store} from '@ng-state/state';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs';
import {resourcePlugin} from '@ng-state/resource-plugin';

interface Todo {
  completed: boolean,
  id: number,
  title: string,
  userId: number
}


const initialState = {
  todos: [] as Todo[]
};
type TodoState = typeof initialState

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService extends Store<TodoState> {
  filteredTodos = computed(() => this.select('todos')().filter((todo) => todo.completed))

  constructor(private http: HttpClient) {
    super(initialState);
    this.use(resourcePlugin);
  }

  init() {
    this.getTodos();
  }

  private getTodos() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      delay(2500),
      this.actions.trackStatus(),
    ).subscribe((todos) => {
      this.update({todos})
    })
  }
}
