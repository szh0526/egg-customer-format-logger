'use strict'

import { Context } from "egg"
import { CustomTransport } from './lib/CustomTransport';

const Logger = require('egg-logger').Logger
const ConsoleTransport = require('egg-logger').ConsoleTransport

export function AppLogger(ctx: Context) {
  const { customerLogger : { file = '/var/log/egg-server-ssr/test.log', fileLoggerLevel = 'INFO', consoleLevel = 'INFO' }} = ctx.app.config;

  const logger = new Logger()

  logger.set('file', new CustomTransport({
    level: fileLoggerLevel,
  file }, ctx))

  logger.set('console', new ConsoleTransport({
    level: consoleLevel
  }))

  return logger
}
