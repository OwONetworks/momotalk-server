import log4js from 'log4js'
import { LOG_LEVEL } from '../config'

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    file: {
      type: 'file',
      filename: 'logs/server.log',
      maxLogSize: 10485760,
      backups: 3
    }
  },
  categories: {
    default: {
      appenders: ['console', 'file'],
      level: LOG_LEVEL
    }
  }
})

export const getLogger = log4js.getLogger
