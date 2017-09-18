let app = null

function castArray(arr) {
  return (typeof arr !== 'object' || typeof arr.length === 'undefined') ? [arr] : arr
}

function register(blueprint = {}) {
  const { adapter } = blueprint

  if (!adapter) {
    console.error('No adapter provided')
    return;
  }

  let service = null
  if (typeof adapter === 'function') {
    service = adapter(blueprint.options)
  } else if (adapter) {
    service = adapter
  }

  if (!service) {
    console.error(`Could not initialize ${service.serviceName || 'UNNAMED SERVICE'}. Have you provided an adapter?`)
    return;
  }

  app.use(blueprint.serviceName, ...castArray(service))

  const registeredService = app.service(blueprint.serviceName)
  if (blueprint.hooks) {
    for (const hooksType in blueprint.hooks) {
      registeredService[hooksType](blueprint.hooks[hooksType])
    }
  }
  return registeredService
}

function init(application) {
  if (!app) {
    app = application
  }
}

module.exports = {
  init,
  register,
}
