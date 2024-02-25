import 'dotenv/config'
import convict from 'convict'
import path from 'path'

const multimediaConfig = convict({
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
      default: 'mongodb://localhost:27017/multimedia-backend-dev'
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
  aws: {
    s3: {
      bucketName: {
        doc: 'AWS S3 bucket name',
        format: String,
        env: 'AWS_S3_BUCKET_NAME',
        default: 'backoffice-multimedia'
      },
      accessKeyId: {
        doc: 'AWS S3 access key id',
        format: String,
        env: 'AWS_S3_ACCESS_KEY_ID',
        default: '123'
      },
      secretAccessKey: {
        doc: 'AWS S3 secret access key',
        format: String,
        env: 'AWS_S3_SECRET_ACCESS_KEY',
        default: '123'
      },
      region: {
        doc: 'AWS S3 region',
        format: String,
        env: 'AWS_S3_REGION',
        default: 'eu-west-1'
      },
      endpoint: {
        doc: 'AWS S3 endpoint',
        format: String,
        env: 'AWS_S3_ENDPOINT',
        default: 'http://localhost:4566'
      }
    }
  }
})

const getConfig: string = multimediaConfig.get('env')

multimediaConfig.loadFile([
  path.join(__dirname, 'default.json'),
  path.join(__dirname, `/${getConfig}.json`)
])

export default multimediaConfig
