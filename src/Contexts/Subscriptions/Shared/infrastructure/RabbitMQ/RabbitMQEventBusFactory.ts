import { type FailoverPublisher } from '@Shared/infrastructure/EventBus/FailoverPublisher/FailoverPublisher'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { type RabbitMQqueueFormatter } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter'
import { type RabbitMQConfig } from './RabbitMQConfigFactory'
import { RabbitMQEventBus } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus'

/**
 * Factory class for creating RabbitMQ event bus.
 */
export class RabbitMQEventBusFactory {
  /**
   * Creates a RabbitMQ event bus based on the provided settings.
   *
   * @param failoverPublisher The failover publisher.
   * @param connection The RabbitMQ connection.
   * @param queueNameFormatter The queue name formatter.
   * @param config The RabbitMQ configuration.
   * @returns The RabbitMQ event bus.
   */
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
