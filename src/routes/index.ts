import express from 'express'
import todoRouter from '@/routes/todo.routes'
import userRouter from '@/routes/user.routes'

const apiRoute = express()

apiRoute.use('/todo', todoRouter)
apiRoute.use('/user', userRouter)

export default apiRoute
