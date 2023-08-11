export function UserService(userRepository) {
  return {
    async all() {
      return await userRepository.all()
    },
    async getById(id) {
      return await userRepository.getById(id)
    },
    async signup(user) {
      return await userRepository.insert(user)
    },
    async signout(id) {
      return await userRepository.deleteById(id)
    },
  }
}
