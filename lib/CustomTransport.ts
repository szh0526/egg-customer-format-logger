'use strict';

import { Context } from "egg";

const moment = require('moment')
const { serviceIPAddress, clientRealIPAddress, clientRealReqDomain, loggerDelimiter } = require('./utils')
const util = require('util')
const FileTransport = require('egg-logger').FileTransport;

export class CustomTransport extends FileTransport {
  public ctx: any;

  constructor(options: any, ctx: Context) {
    super(options)

    this.ctx = ctx; // 得到每次请求的上下文
  }

  log(level: any, args: any, meta: any) {
    // 获取自定义格式消息
    const customMsg = this.messageFormat({ level });

    // Error 消息打印出错误的堆栈 ，字符串直接打印
    if (args[0] instanceof Error) {
      const err = args[0] || {};
      const errorMsg = util.format('%s: %s\n%s\npid: %s\n', err.name, err.message, err.stack, process.pid);
      args[0] = `${customMsg}\r\n${errorMsg}`;
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
  messageFormat({ level }: any) {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const url = this.ctx.request.url || '';
    // 通过 requestId 可以在 elk (日志系统) 分析查询时间，请求响应时间等指标
    // 每个请求下所有的requestId都是一样的，以获得统一解析的日志文件，便于排查问题。
    const requestId = this.ctx.requestId || 'none';
    // const clientIPAddress = clientIPAddress(this.ctx.request);
    const _clientRealReqDomain = clientRealReqDomain(this.ctx);
    const _clientRealIPAddress = clientRealIPAddress(this.ctx);

    return [
      `[ ${level} ]`, // 日志级别
      `[ ${date} ]`, // 当前日期
      `[ ${requestId} ]`, // 全链路跟踪id
      `[ ${serviceIPAddress} ]`, // 当前服务器IP
      // `[ ${clientIPAddress} ]`, // 当前客户端IP
      `[ ${_clientRealReqDomain} ]`, // 当前客户端真实域名
      `[ ${_clientRealIPAddress} ]`, // 当前客户端真实IP
      `[ ${url} ]`, // 当前请求地址
    ].join(loggerDelimiter);
  }
}
