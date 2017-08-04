let app;

function get(serviceName) {
  return app.service(serviceName)
}

function initialize(blueprint) {
  const { adapter } = blueprint

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

function register(blueprint) {
  if (typeof blueprint === 'function') {
    blueprint = blueprint(app)
  }

  initialize(blueprint)
}

function init(application) {
  app = application
}

module.exports = {
  init,
  register,
  get,
}
