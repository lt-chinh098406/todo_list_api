import TodoModel from '@/models/todo.models'

interface Todo {
  title: string
  description: string
  statusId: number
  properties: string[]
  creator: string
}
interface TodoService {
  getAllTodos(): any
  createTodo<T extends Todo>(body: T): Promise<void>
}

const TodoService: TodoService = {
  getAllTodos() {
    return {
      message: 'It work!',
    }
  },

  async createTodo(body) {
    const { title, description, statusId, properties, creator } = body

    const newTodo = new TodoModel({
      title,
      description,
      statusId,
      properties,
      creator,
    })

    try {
      await newTodo.save()
    } catch (e) {
      console.log(e)
    }
  },
}

export default TodoService

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
