import TodoModel from '@/models/todo.models'

interface TodoService {
  getAllTodos(): Promise<any>
}

const TodoService: TodoService = {
  async getAllTodos() {
    return await TodoModel.find({})
  },
}

export default TodoService
