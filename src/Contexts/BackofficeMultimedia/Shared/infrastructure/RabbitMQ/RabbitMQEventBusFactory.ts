import { type FailoverPublisher } from '@Shared/infrastructure/EventBus/FailoverPublisher/FailoverPublisher'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { type RabbitMQqueueFormatter } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter'
import { type RabbitMQConfig } from './RabbitMQConfigFactory'
import { RabbitMQEventBus } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus'

export class RabbitMQEventBusFactory {
  public static create(
    failoverPublisher: FailoverPublisher,
    connection: RabbitMQConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchangeName: config.exchangeSettings.name,
      queueNameFormatter,
      maxRetries: config.maxRetries
    })
  }
}
