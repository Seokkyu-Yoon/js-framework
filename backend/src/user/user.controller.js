import { User } from './user.model'

export function UserController(userService) {
  return {
    async all() {
      const users = await userService.all()
      return users.map((user) => user.excludePassword())
    },
    async getById(req) {
      const id = req.params.id || null
      if (id === null) throw new Error('id is not defined')
      const user = await userService.getById(id)
      return user
    },
    async signup(req) {
      const user = User(req.body)
      return await userService.signup(user)
    },
    async signout(req) {
      const id = req.params.id || null
      if (id === null) throw new Error('id is not defined')
      const deleted = await userService.signout(id)
      return deleted
    },
  }
}
