import { User } from '../user.model'
import { MemoryDB } from '../../db/memory'

export function DataSourceMemory() {
  const memoryDB = MemoryDB()
  return {
    async getUsers() {
      return memoryDB.schema.users.map(User)
    },
    async getUserById(id) {
      const savedUser = memoryDB.schema.users.find((u) => u.id === id) || null
      if (savedUser === null) throw new Error('cannot find user')
      return User(savedUser)
    },
    async insertUser(user) {
      if (user.id === null) throw new Error('id is not nullable')
      if (memoryDB.schema.users.some((savedUser) => savedUser.id === user.id)) {
        throw new Error('id user is already exists')
      }
      memoryDB.schema.users.push(user)
      return User(user)
    },
    async deleteUserById(id) {
      for (let i = 0; i < memoryDB.schema.users.length; i += 1) {
        const user = memoryDB.schema.users[i]
        if (user.id === id) {
          memoryDB.schema.users.splice(i, 1)
          return true
        }
      }
      return false
    },
  }
}
