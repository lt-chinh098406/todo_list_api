import { NextFunction, Request, Response } from 'express'
import { Controller, Get, Post, Middleware } from '@overnightjs/core'
import { Service } from 'typedi'
import { IUser } from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { checkJwt } from '@/middleware/checkJwt.middleware'

import UserService from '@/services/UserService'
import { mongooseToObject } from '@/utils/mongoose'

@Service()
@Controller('api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  private async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result: {} = await this.userService.login(req.body)
      res.status(200).json({ data: result })
    } catch (error) {
      res.status(400)
    }
  }

  @Post('token/refresh')
  private async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.body.token
      if (!refreshToken) res.status(401)

      const result: {} = await this.userService.refreshToken(refreshToken)
      res.status(200).json({ data: result })
    } catch (error) {
      res.status(400)
    }
  }

  @Get('/me')
  @Middleware(checkJwt)
  private async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params.id

      const result: IUser = await this.userService.me(userId)
      res.status(200).json({ data: mongooseToObject(result) })
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
