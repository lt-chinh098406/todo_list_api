import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import logger from '@/utils/logger'

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  //Get the jwt token from the head
  const authorizationHeader = <string>req.headers['authorization']
  if (authorizationHeader) {
    const jwtToken: string = <string>process.env.JWT_ACCESS_SECRET

    const token = authorizationHeader.split(' ')[1]

    jwt.verify(token, jwtToken)
    next()
  } else {
    res.status(401).json({ errCd: 'author_failed' })
    logger.error(res.locals.jwtPayload, 'author_failed')
  }
}
