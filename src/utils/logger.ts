import logger from 'pino'
import dayjs from 'dayjs'

export default logger({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      translateTime: true,
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
})
