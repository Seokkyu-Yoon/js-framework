export function User({
  id = null,
  password = null,
  name = null,
  phone = null,
} = {}) {
  // [TODO] insert validation code
  return {
    id,
    password,
    name,
    phone,
    excludePassword,
  }

  function excludePassword() {
    return { id, name, phone }
  }
}
