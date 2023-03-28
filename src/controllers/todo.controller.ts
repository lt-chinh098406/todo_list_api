import { Request, Response } from 'express'

import TodoService from '@/services/todo.service'

interface TodoController {
  getAllTodos(req: Request, res: Response): Promise<void>
  createTodo(req: Request, res: Response): Promise<void>
}

const TodoController: TodoController = {
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await TodoService.getAllTodos()
      res.status(200).json({ todos })
    } catch (error) {
      res.status(400)
    }
  },

  async createTodo(req: Request, res: Response) {
    try {
      const body = req.body
      await TodoService.createTodo(body)

      res.status(200).json({ message: 'Create success new todo' })
    } catch (error) {
      res.status(400).json({ message: 'Create failure new todo' })
    }
  },
}

export default TodoController
