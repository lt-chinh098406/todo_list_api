import express from 'express'

import TodoController from '@/controllers/todo.controller'

const router = express.Router()

router.get('/', TodoController.getAllTodos)
