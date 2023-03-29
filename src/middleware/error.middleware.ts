import HttpException from '../exceptions/HttpException'
import { Request, Response, NextFunction } from 'express'
import logger from '@/utils/logger'
import { ERROR_CODE } from '../consts/ErrorCode'

// eslint-disable-next-line
export const errorHandler = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const status = error.statusCode || 500
  const errCode = error.errCd || ERROR_CODE.SYSTEM_ERROR
  logger.error(response?.locals?.jwtPayload, error)
  response.status(status).json({ errCd: errCode })
}
