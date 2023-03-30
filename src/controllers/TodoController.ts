import { NextFunction, Request, Response } from 'express'
import { Controller, Get, Patch, Post, Delete } from '@overnightjs/core'
import { Service } from 'typedi'
import { ITodo } from '@/models/Todo'

import { TodoService } from '@/services/TodoService'
import { multipleMongooseToObject, mongooseToObject } from '@/utils/mongoose'

@Service()
@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('list')
  private async listTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: ITodo[] = await this.todoService.listTodo().catch((e) => {
        throw e
      })

      res.status(200).json({ data: multipleMongooseToObject(result) })
    } catch (e) {
      next(e)
    }
  }

  @Get('/:id/detail')
  private async getDetailTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const todoId = req.params.id

      const result: ITodo = await this.todoService
        .getDetailTodo(todoId)
        .catch((e) => {
          throw e
        })

      res.status(200).json({ data: mongooseToObject(result) })
    } catch (e) {
      next(e)
    }
  }

  @Post('create')
  private async addTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body

      const result: ITodo = await this.todoService.addTodo(body).catch((e) => {
        throw e
      })
      res.status(200).json({ data: mongooseToObject(result) })
    } catch (e) {
      next(e)
    }
  }

  @Patch('/:id/update')
  private async updateTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body
      const todoId = req.params.id

      const result: ITodo = await this.todoService
        .updateTodo(body, todoId)
        .catch((e) => {
          throw e
        })
      res.status(200).json({ data: mongooseToObject(result) })
    } catch (e) {
      next(e)
    }
  }

  @Delete(':id/delete')
  private async deleteTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const todoId = req.params.id

      const result: ITodo = await this.todoService
        .deleteTodo(todoId)
        .catch((e) => {
          throw e
        })
      res.status(200).json({ data: mongooseToObject(result) })
    } catch (e) {
      next(e)
    }
  }
}
