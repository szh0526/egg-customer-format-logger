import { Context } from "egg";
const interfaces = require('os').networkInterfaces()

/**
 * 日志分隔符
 */
export const loggerDelimiter = '';

/**
 * 获取当前服务器IP
 */
export const serviceIPAddress = (() => {
  for (const devName in interfaces) {
    const iface = interfaces[devName]

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
})();

/**
 * 获取当前请求客户端IP
 * 不安全的写法
 * @param { Object } req 请求
 */
export function clientIPAddress(req: any) {
  const address = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    (req.connection && req.connection.remoteAddress) || // 判断 connection 的远程 IP
    (req.socket && req.socket.remoteAddress) || // 判断后端的 socket 的 IP
    (req.connection && req.connection.socket.remoteAddress)

  return address.replace(/::ffff:/ig, '')
};

/**  
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的IP
 * @param { Object } ctx 请求上下文
 */
export function clientRealIPAddress(ctx: Context) {
  const {
    ip,// 获取用户的 IP 地址 
  } = ctx;

  return `${ip}`;
};

/**  
 * 需要对用户的 IP 做限流、防刷限制时，获取真实的请求域名
 * @param { Object } ctx 请求上下文
 */
export function clientRealReqDomain(ctx: Context) {
  const {
    host,// 获取用户请求的域名 
    protocol// 获取用户请求的协议
  } = ctx;
  return `${protocol}://${host}`;
};