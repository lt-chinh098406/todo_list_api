import TodoModel, { ITodo } from '@/models/Todo'
import { TodoRepository } from '@/repositories/TodoRepository'
import { Service } from 'typedi'

@Service()
export class TodoService {
  protected readonly repository: TodoRepository

  constructor(repository: TodoRepository) {
    this.repository = repository
  }

  listTodo(): Promise<ITodo[]> {
    return this.repository.listTodo()
  }

  getDetailTodo(todoId: string): Promise<ITodo> {
    return this.repository.getDetailTodo(todoId)
  }

  addTodo(body: ITodo): Promise<string> {
    const newTodo = new TodoModel(body)
    return this.repository.addTodo(newTodo, body.creator)
  }

  updateTodo(body: ITodo, todoId: string): Promise<string> {
    return this.repository.updateTodo(body, todoId)
  }

  deleteTodo(todoId: string): Promise<string> {
    return this.repository.deleteTodo(todoId)
  }
}

// example todo
// {
//   "title": "Learn Nodejs",
//   "description": "coding API todo list",
//   "statusId": 1,
//   "properties": [
//       "Learn Express",
//       "Learn MongoDB + Mongoose",
//       "Learn Config source base",
//       "Learn Docker + CI/CD"
//   ],
//   "creator": "u1"
// }
