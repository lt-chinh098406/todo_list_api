import { Request, Response } from 'express'

import UserService from '@/services/user.service'

interface UserController {
  login(req: Request, res: Response): Promise<void>
  register(req: Request, res: Response): Promise<void>
}

const UserController: UserController = {
  async login(req: Request, res: Response) {
    try {
      const user = await UserService.login()
      res.status(200).json({ user })
    } catch (error) {
      res.status(400)
    }
  },
  async register(req: Request, res: Response) {
    try {
      const body = req.body

      await UserService.register(body)
      res.status(200).json({ message: 'Create success new User' })
    } catch (error) {
      res.status(400).json({ message: 'Create failure new User' })
    }
  },
}

export default UserController
