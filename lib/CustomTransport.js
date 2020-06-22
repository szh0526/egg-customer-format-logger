'use strict';
const moment = require('moment')
const FileTransport = require('egg-logger').FileTransport
const utils = require('./utils')
const util = require('util')

class CustomTransport extends FileTransport {
  constructor (options, ctx) {
    super(options)

    this.ctx = ctx; // 得到每次请求的上下文
  }

  log (level, args, meta) {
    // 获取自定义格式消息
    const customMsg = this.messageFormat({ level });

    // Error 消息打印出错误的堆栈 ，字符串直接打印
    if (args[0] instanceof Error) {
      const err = args[0] || {}
      args[0] = util.format('%s: %s\n%s\npid: %s\n', err.name, err.message, err.stack, process.pid)
    } else {
      args[0] = util.format(customMsg, args[0])
    }

    // 这个是必须的，否则日志文件不会写入
    super.log(level, args, meta)
  }

  /**
   * 自定义消息格式
   * @param { String } level 日志级别
   */
  messageFormat ({ level }) {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const url = this.ctx.request.url || '';
    const traceId = this.ctx.request.get('traceId') || '';
    // const clientIPAddress = utils.clientIPAddress(this.ctx.request);
    const serviceIPAddress = utils.serviceIPAddress;
    const clientRealIPAddress = utils.clientRealIPAddress(this.ctx);
    
    return [
        `[ ${level} ]`, // 日志级别
        `[ ${date} ]`, // 当前日期
        `[ ${traceId} ]`, // 全链路跟踪id
        `[ ${serviceIPAddress} ]`, // 当前服务器IP
        // `[ ${clientIPAddress} ]`, // 当前客户端IP
        `[ ${clientRealIPAddress} ]`, // 当前客户端真实IP
        `[ ${url} ]`, // 当前请求地址
      ].join(utils.loggerDelimiter);
  }
}

module.exports = CustomTransport
