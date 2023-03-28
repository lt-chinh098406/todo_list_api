import express from 'express'
import { Request, Response } from 'express'

import TodoController from '@/controllers/todo.controller'

const router = express.Router()

router.post('/create', (req: Request, res: Response) =>
  TodoController.createTodo(req, res)
)
router.get('/', (req: Request, res: Response) =>
  TodoController.getAllTodos(req, res)
)

export default router
