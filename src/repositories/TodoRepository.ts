import { Service } from 'typedi'
import TodoModel, { ITodo } from '@/models/Todo'
import User, { IUser } from '@/models/User'

@Service()
export class TodoRepository {
  async listTodo(): Promise<ITodo[]> {
    try {
      return await TodoModel.find()
    } catch (error) {
      throw error
    }
  }

  async addTodo(newTodo: ITodo, creator: string): Promise<string> {
    try {
      const saveTodo: ITodo = await newTodo.save()

      if (creator) {
        const user: IUser = await User.findById(creator)
        await user.updateOne({ $push: { todos: saveTodo._id } })
      }
      return 'Create Successfully!'
    } catch (error) {
      throw error
    }
  }

  async getDetailTodo(todoId: string): Promise<ITodo> {
    try {
      return await TodoModel.findById(todoId)
    } catch (error) {
      throw error
    }
  }

  async updateTodo(body: ITodo, todoId: string): Promise<string> {
    try {
      const todo: ITodo = await TodoModel.findById(todoId)

      await todo.updateOne({ $set: body })

      return 'Update Successfully!'
    } catch (error) {
      throw error
    }
  }

  async deleteTodo(todoId: string): Promise<string> {
    try {
      await User.updateMany({ todos: todoId }, { $pull: { todos: todoId } })
      await TodoModel.findByIdAndDelete(todoId)

      return 'Delete Successfully!'
    } catch (error) {
      throw error
    }
  }
}
