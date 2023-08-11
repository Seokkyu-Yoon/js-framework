import path from 'node:path'

import { Express } from './express'
import { MemoryDB } from './db/memory'
import UserModule from './user'

export async function App(port) {
  const rootPath = path.join(__dirname, '..')
  const viewPath = path.join(rootPath, 'public')
  const staticPath = path.join(rootPath, 'public')

  const memoryDB = MemoryDB()
  await memoryDB.setup()

  const userModule = UserModule()

  return Express(port, viewPath, staticPath, { userModule })
}
