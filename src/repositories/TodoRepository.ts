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

  async getDetailTodo(todoId: string): Promise<ITodo> {
    try {
      return await TodoModel.findById(todoId)
    } catch (error) {
      throw error
    }
  }

  async updateTodo(body: ITodo, todoId: string): Promise<ITodo> {
    const { title, description, statusId, properties } = body
    let todo = await TodoModel.findById(todoId)

    console.log(body)

    if (!todo) {
      console.log('error')
    }

    try {
      todo.title = title
      todo.description = description
      todo.statusId = statusId
      todo.properties = properties
      return await todo.save()
    } catch (error) {
      throw error
    }
  }

  async listTodo(): Promise<ITodo[]> {
    try {
      return await TodoModel.find()
    } catch (error) {
      throw error
    }
  }

  async deleteTodo(todoId: string): Promise<ITodo> {
    const todo = await TodoModel.findById(todoId).populate('creator')

    if (!todo) {
      console.log('error')
    }

    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      await todo.deleteOne({ session })
      todo.creator.todos.pull(todo)
      await todo.creator.save({ session })

      return todo
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }
}
