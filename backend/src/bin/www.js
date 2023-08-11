import http from 'http'
import https from 'https'

import { App } from '../app'
;(async function main() {
  const port = normalizePort()
  const protocol = getProtocol()
  const app = await App(port)
  Server(protocol, app)
    .on('error', ErrorHandler(port))
    .on('listening', ListenHandler(protocol, port))
    .listen(port)
})()

function normalizePort() {
  const strPort = process.env.SERVER_PORT || '20810'
  const numPort = parseInt(strPort, 10)
  if (isNaN(numPort)) throw new Error('invalid port')
  if (numPort < 0) throw new Error('port number must upper than zero')
  return numPort
}

function getProtocol() {
  return process.env.SERVER_PROTOCOL || 'http'
}

/**
 * @param {"http"|"https"} protocol
 */
function Server(protocol = 'http', app) {
  if (protocol === 'http') return http.createServer(app)
  if (protocol === 'https') return https.createServer(app)
  throw new Error('invalid protocol')
}

function ErrorHandler(port) {
  /**
   * @param {NodeJS.ErrnoException} err
   */
  return function onError(err) {
    if (err.syscall !== 'listen') throw err
    switch (err.code) {
      case 'EACCES':
        console.error(`${port} requires elevated privileges`)
        break
      case 'EDDRINUSE':
        console.error(`${port} is laready in use`)
        break
      default:
        console.error(err)
        break
    }
    process.exit(1)
  }
}

function ListenHandler(protocol, port) {
  return function onListening() {
    console.log(`* listening on ${protocol}://localhost:${port}`)
  }
}
