export function ControllerAdapter(controller = () => {}) {
  if (typeof controller !== 'function') {
    throw new Error('controller must be a function')
  }
  return function (req, res, next) {
    try {
      const dataOrPromise = controller(req)
      if (dataOrPromise instanceof Promise) {
        return dataOrPromise
          .then((data) => res.send(data))
          .catch((err) => next(err))
      } else {
        res.send(dataOrPromise)
      }
    } catch (err) {
      next(err)
    }
  }
}

export function MiddlewareAdapter(middleware = () => {}) {
  if (typeof middleware !== 'function') {
    throw new Error('middleware must be a function')
  }
  return function (req, res, next) {
    try {
      const dataOrPromise = middleware(req)
      if (dataOrPromise instanceof Promise) {
        return dataOrPromise
          .then((data) => {
            if (data) {
              req._injected = req._injected || {}
              Object.assign(req._injected, data)
            }
            next()
          })
          .catch((err) => next(err))
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}

export function Renderer(viewfile) {
  return function (req, res, next) {
    res.render(viewfile)
  }
}
