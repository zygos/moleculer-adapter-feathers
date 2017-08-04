# moleculer-adapter-feathers

Moleculer adapter to import feathers services. That includes:
- MongoDB
- Blob store
- Bookshelf
- CouchDB
- Elasticsearch
- Knex
- Mongoose
- NeDB
- RethinkDB
- Sequalize
- Waterline
- [many others](https://docs.feathersjs.com/ecosystem/readme.html)

# Install

```bash
$ npm install moleculer-adapter-feathers --save
```

# Usage (example with Knex)

```js
const Feathers = require("moleculer-adapter-feathers");
const { ServiceBroker } = require("moleculer");
const feathersKnex = require("feathers-knex");
const knex = require("knex");

const broker = new ServiceBroker();

// Create a DB service via knex for `user` entities
broker.createService({
    name: "users",
    mixins: [Feathers],
    settings: {
        feathers: {
            adapter: feathersKnex,
            name: "users",
            Model: new knex({
                client: "pg",
                connection: { ... },
            }),
        },
    },
});

broker.start()
// Create a new user
.then(() => broker.call("users.create", {
    username: "john",
    email: "john@doe.com",
}))

// Get all users
.then(() => broker.call("users.find").then(console.log));

```

# Settings

<!-- AUTO-CONTENT-START:SETTINGS -->
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `adapter` | `Object | Function` | **required** | Feathers Knex service adapter. |
| `hooks` | `Object` | `{}` | Optional object containing before and after hooks. |
| `*` | `any` | `null` | All the rest of the parameters will be passed when initializing a Feathers service. |

<!-- AUTO-CONTENT-END:SETTINGS -->

<!-- AUTO-CONTENT-TEMPLATE:SETTINGS
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
{{#each this}}
| `{{name}}` | {{type}} | {{defaultValue}} | {{description}} |
{{/each}}
{{^this}}
*No settings.*
{{/this}}

-->

# Hooks

Hooks work just as they do in Feathers. They are passed down to a service in `settings.feathers.hooks`.

```js
{
    settings: {
        feathers: {
            adapter: feathersKnex,
            name: "users",
            hooks: require('./hooks'),
            Model: new knex({
                client: "pg",
                connection: { ... },
            }),
        },
    },
}
```

#### `hooks.js`

```js
module.exports = {
    before: {
        create: [
            hook => {
                console.log('create hook')
                return hook
            },
        ],
        find: [],
        get: [],
        update: [],
        patch: [],
        remove: [],
    },
    after: {
        create: [],
        find: [],
        update: [],
        patch: [],
        remove: [],
    },
}
```

# Actions

Standard Feathers actions are exposed: `create`, `get`, `find`, `update`, `patch`, `remove` with all the standard Feathers parameters. Actions can be overwritten.

# Methods

Feathers service methods can be accessed directly via `this.create`, `this.find` and etc.

## `create` 

Create an object in a service.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `*` | `Any` | `{}` | Object to be created. |

### Results
**Type:** `Object`

Created object (or any other service response).

## `find` 

Find objects by a provided query, if any.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `*` | `Any` | `{}` | Query specified by the service. |

### Results
**Type:** `Array[Object]`

Array of results.

## `get` 

Get object in the service by a provided (unique) ID.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `id` | `String | Number` | **required** | Object ID. |

### Results
**Type:** `Object`

Object found by the ID.

## `patch`

Changes the properties of an object.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `id` | `String | Number` | **required** | Object ID. |
| `*` | `Any` | `{}` | Values to be patched. |

### Results
**Type:** `Object`

Object patched.

## `update`

Overwrites an object's properties.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `id` | `String | Number` | **required** | Object ID. |
| `*` | `Any` | `{}` | Rest of the object. |

### Results
**Type:** `Object`

Object updated.

## `remove`

Remove object by ID.

### Parameters
| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| `id` | `String | Number` | **required** | Object ID. |

### Results
**Type:** `Object`

Object removed.
