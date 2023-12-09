import 'module-alias/register'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { container } from '../dependency-injection'
import { type RabbitMQqueueFormatter } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter'
import { type RabbitMQConfig } from '@Auth/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory'
import { RabbitMQConfigurer } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'

export class ConfigureRabbitMQCommand {
  public static async run(): Promise<ConfigureRabbitMQCommand> {
    const connection = container.get<RabbitMQConnection>(
      'Auth.Shared.RabbitMQConnection'
    )
    const nameFormatter = container.get<RabbitMQqueueFormatter>(
      'Auth.Shared.RabbitMQqueueFormatter'
    )
    const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>(
      'Auth.Shared.RabbitMQConfig'
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
