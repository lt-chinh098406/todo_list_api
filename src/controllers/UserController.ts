import { NextFunction, Request, Response } from 'express'
import { Controller, Get, Put, Post } from '@overnightjs/core'
import { Service } from 'typedi'
import { IUser } from '@/models/User'

import UserService from '@/services/UserService'
import { multipleMongooseToObject, mongooseToObject } from '@/utils/mongoose'

@Service()
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: IUser = await this.userService.login()
      res.status(200).json({ data: user })
    } catch (error) {
      res.status(400)
    }
  }

  @Post('register')
  private async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const body = req.body

      await this.userService.register(body)
      res.status(200).json({ message: 'Create success new User' })
    } catch (error) {
      res.status(400).json({ message: 'Create failure new User' })
    }
  }
}
