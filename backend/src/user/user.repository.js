export function UserRepository(dataSourceMemory) {
  return {
    async all() {
      return await dataSourceMemory.getUsers()
    },
    async getById(id) {
      return await dataSourceMemory.getUserById(id)
    },
    async insert(user) {
      return await dataSourceMemory.insertUser(user)
    },
    async deleteById(id) {
      return await dataSourceMemory.deleteUserById(id)
    },
  }
}
