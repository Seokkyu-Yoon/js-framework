import { UserController } from './user.controller'

import { DataSourceMemory } from './data-source/memory'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

export function UserModule() {
  const dataSourceMemory = DataSourceMemory()
  const repository = UserRepository(dataSourceMemory)
  const service = UserService(repository)
  const controller = UserController(service)
  return {
    repository,
    service,
    controller,
  }
}
