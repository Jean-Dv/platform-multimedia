import 'module-alias/register'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { container } from '../dependency-injection'
import { type RabbitMQqueueFormatter } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter'
import { type RabbitMQConfig } from '@Subscriptions/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory'
import { RabbitMQConfigurer } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'

/**
 * A command that configures RabbitMQ for the subscription backend application.
 */
export class ConfigureRabbitMQCommand {
  /**
   * Asynchronously runs the command.
   *
   * @returns A promise that resolves to a new instance of the command.
   */
  public static async run(): Promise<ConfigureRabbitMQCommand> {
    const connection = container.get<RabbitMQConnection>(
      'Subscriptions.Shared.RabbitMQConnection'
    )
    const nameFormatter = container.get<RabbitMQqueueFormatter>(
      'Subscriptions.Shared.RabbitMQqueueFormatter'
    )

    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>(
      'Subscriptions.Shared.RabbitMQConfig'
    )

    await connection.connect()
    const configurer = new RabbitMQConfigurer(
      connection,
      nameFormatter,
      retryTtl
    )
    const subscribers = DomainEventSubscribers.from(container).items
    await configurer.configure({
      exchangeName: exchangeSettings.name,
      subscribers
    })
    return new ConfigureRabbitMQCommand()
  }
}
