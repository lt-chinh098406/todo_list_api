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

  addTodo(body: ITodo): Promise<ITodo> {
    const { title, description, statusId, properties, creator } = body

    const newTodo = new TodoModel({
      title,
      description,
      statusId,
      properties,
      creator,
    })

    return this.repository.addTodo(newTodo, creator)
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
