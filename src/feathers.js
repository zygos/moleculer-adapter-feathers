const feathers = require('feathers')
const hooks = require('feathers-hooks')

const app = feathers().configure(hooks())

module.exports = app
