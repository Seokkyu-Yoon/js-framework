let memoryDB = null
export function MemoryDB() {
  if (memoryDB !== null) return memoryDB

  memoryDB = {
    async setup() {
      this.schema = {}
      this.schema.users = this.schema.users || []
      return memoryDB
    },
  }
  return memoryDB
}
