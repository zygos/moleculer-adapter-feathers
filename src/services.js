let app;

function get(serviceName) {
  return app.service(serviceName)
}

function register(blueprint) {
  const { adapter } = blueprint

  if (!adapter) {
    console.error(`No adapter provided`)
    return;
  }

  let service = null
  if (typeof adapter === 'function') {
    service = adapter(blueprint.options)
  } else {
    service = adapter
  }

  if (!service) {
    console.error(`Could not initialize ${service.serviceName || 'UNNAMED SERVICE'}`)
    return;
  }

  app.use(blueprint.serviceName, service)

  if (blueprint.hooks) {
    const serv = app.service(blueprint.serviceName)
    for (const beforeAfter in blueprint.hooks) {
      serv[beforeAfter](blueprint.hooks[beforeAfter])
    }
  }
}

function init(application) {
  app = application
}

module.exports = {
  init,
  register,
  get,
}
