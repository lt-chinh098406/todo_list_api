import express from 'express'
import { Request, Response } from 'express'

import UserController from '@/controllers/user.controller'

const router = express.Router()

router.post('/register', (req: Request, res: Response) =>
  UserController.register(req, res)
)
router.post('/login', (req: Request, res: Response) =>
  UserController.login(req, res)
)

export default router
