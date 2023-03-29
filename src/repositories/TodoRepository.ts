import { Service } from 'typedi'
import TodoModel, { ITodo } from '@/models/Todo'
import UserModel, { IUser } from '@/models/User'
import mongoose from 'mongoose'

@Service()
export class TodoRepository {
  async addTodo(newTodo: ITodo, creator: string): Promise<ITodo> {
    const user: IUser = await UserModel.findById(creator)

    if (!user) {
      console.log('error')
    }
    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      await newTodo.save({ session })
      user.todos.push(newTodo)
      await user.save({ session })

      await session.commitTransaction()
      return newTodo
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }

  async listTodo(): Promise<ITodo[]> {
    return await TodoModel.find()
  }
}
