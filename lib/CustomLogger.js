'use strict'
const Logger = require('egg-logger').Logger
const ConsoleTransport = require('egg-logger').ConsoleTransport
const CustomTransport = require('./CustomTransport')

exports.default = (ctx) => {
  console.log(ctx.app)
  const { customerLogger: { file = '/var/log/egg-server-ssr/test.log', fileLoggerLevel = 'INFO', consoleLevel = 'INFO' } } = ctx.app.config

  const logger = new Logger()

  logger.set('file', new CustomTransport({
    level: fileLoggerLevel,
  file }, ctx))
  logger.set('console', new ConsoleTransport({
    level: consoleLevel
  }))
  return logger
}
