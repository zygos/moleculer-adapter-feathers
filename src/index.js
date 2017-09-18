'use strict';

const app = require('./feathers')
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
    idField() {
      return this.feathersOptions().idField || 'id'
    },
    idParam() {
      const idField = this.idField()
      return {
        [idField]: {
          type: 'number',
          min: 1,
        },
      }
    },
    mapParams(ctx) {
      const idField = this.idField()
      return Object
        .keys(ctx.params)
        .filter(key => key !== idField)
        .reduce((acc, key) => {
          acc[key] = ctx.params[key]
          return acc
        }, {})
    },
  },

  created() {
    const options = this.feathersOptions()
    const serviceName = this.name

    this.feathers = services.register({
      serviceName,
      options,
    })
  },
}
