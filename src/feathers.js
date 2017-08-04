const feathers = require('feathers')
const hooks = require('feathers-hooks')

module.exports = () => feathers().configure(hooks())
