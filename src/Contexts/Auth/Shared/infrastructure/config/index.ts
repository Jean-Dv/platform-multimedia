import 'dotenv/config'
import convict from 'convict'
import path from 'path'

convict.addFormat({
  name: 'routes-array',
  validate: function (routes, schema) {
    if (!Array.isArray(routes)) {
      throw new Error('must be of type Array')
    }

    for (const route of routes) {
      convict(schema.children).load(route).validate()
    }
  }
})

const authConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test', 'staging'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The url of the mongo database.',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://localhost:27017/auth-backend-dev'
    }
  },
  rabbitmq: {
    connectionSettings: {
      username: {
        doc: 'RabbitMQ username',
        format: String,
        env: 'RABBITMQ_USERNAME',
        default: 'guest'
      },
      password: {
        doc: 'RabbitMQ password',
        format: String,
        env: 'RABBITMQ_PASSWORD',
        default: 'guest'
      },
      vhost: {
        doc: 'RabbitMQ virtual host',
        format: String,
        env: 'RABBITMQ_VHOST',
        default: '/'
      },
      connection: {
        secure: {
          doc: 'RabbitMQ secure protocol',
          format: Boolean,
          env: 'RABBITMQ_SECURE',
          default: false
        },
        hostname: {
          doc: 'RabbitMQ hostname',
          format: String,
          env: 'RABBITMQ_HOSTNAME',
          default: 'localhost'
        },
        port: {
          doc: 'RabbitMQ amqp port',
          format: Number,
          env: 'RABBITMQ_PORT',
          default: 5672
        }
      }
    },
    exchangeSettings: {
      name: {
        doc: 'RabbitMQ exchange name',
        format: String,
        env: 'RABBITMQ_EXCHANGE_NAME',
        default: 'domain_events'
      }
    },
    maxRetries: {
      doc: 'Max number of retries for each message',
      format: Number,
      env: 'RABBITMQ_MAX_RETRIES',
      default: 3
    },
    retryTtl: {
      doc: 'Ttl for messages in the retry queue',
      format: Number,
      env: 'RABBITMQ_RETRY_TTL',
      default: 1000
    }
  },
  auth: {
    secret: {
      doc: 'Secret key for JWT',
      format: String,
      env: 'AUTH_SECRET',
      default: 'secret'
    },
    expiresIn: {
      doc: 'Expiration time for JWT',
      format: String,
      env: 'AUTH_EXPIRES_IN',
      default: '2 days'
    }
  },
  routes: {
    doc: 'Routes for the application',
    format: 'routes-array',
    default: [],

    children: {
      url: {
        doc: 'The url of the route',
        format: String,
        default: '/multimedia'
      },
      auth: {
        doc: 'The authentication needed for the route',
        format: 'object',
        default: {},
        children: {
          user: {
            doc: 'The user needed for the route',
            format: Boolean,
            default: false
          },
          admin: {
            doc: 'The admin needed for the route',
            format: Boolean,
            default: false
          }
        }
      },
      proxy: {
        doc: 'The proxy settings for the route',
        format: 'object',
        default: {},
        children: {
          target: {
            doc: 'The target of the proxy',
            format: String,
            default: 'http://localhost:4000'
          },
          changeOrigin: {
            doc: 'Change the origin of the request',
            format: Boolean,
            default: true
          },
          pathRewrite: {
            doc: 'Rewrite the path of the request',
            format: 'object',
            default: {
              '^/multimedia': ''
            }
          }
        }
      }
    }
  }
})

const getConfig: string = authConfig.get('env')

authConfig.loadFile([
  path.join(__dirname, 'default.json'),
  path.join(__dirname, `/${getConfig}.json`)
])

export default authConfig
