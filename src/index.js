'use strict';

const app = require('./feathers')()
const services = require('./services')
services.init(app)

module.exports = {
  name: '',
  feathers: null,
  actions: {
    create(ctx) {
      return this.create(this.mapParams(ctx))
    },
    get: {
      params: this.idParam,
      handler(ctx) {
        return this.get(ctx.params.id)
      },
    },
    find(ctx) {
      return this.find(this.mapParams(ctx))
    },
    update: {
      params: this.idParam,
      handler(ctx) {
        return this.update(ctx.params.id, this.mapParams(ctx))
      },
    },
    patch: {
      params: this.idParam,
      handler(ctx) {
        return this.patch(ctx.params.id, this.mapParams(ctx))
      },
    },
    remove: {
      params: this.idParam,
      handler(ctx) {
        return this.remove(ctx.params.id, this.mapParams(ctx))
      },
    },
  },

  methods: {
    create(params) {
      return this.feathers.create(params)
    },
    get(id) {
      return this.feathers.get(id)
    },
    find(params) {
      return this.feathers.find(params)
    },
    update(id, params) {
      return this.feathers.update(id, params)
    },
    patch(id, params) {
      return this.feathers.patch(id, params)
    },
    remove(id, params) {
      return this.feathers.remove(id, params)
    },

    feathersOptions() {
      return this.settings.feathers.options || {}
    },
    idParam() {
      const settings = this.feathersOptions()
      const idField = settings.idField || 'id'
      const params = {}
      params[idField] = {
        type: 'number',
        min: 1,
      }
      return params
    },
    mapParams(ctx) {
      return Object
        .keys(ctx.params)
        .filter(key => key !== 'id')
        .reduce((acc, key) => {
          acc[key] = ctx.params[key]
          return acc
        }, {})
    },
  },

  created() {
    const self = this
    const serviceName = this.name
    const blueprint = {
      serviceName,
      options: self.feathersOptions(),
    }
    services.register(blueprint)

    this.feathers = services.get(serviceName)
  },
}
