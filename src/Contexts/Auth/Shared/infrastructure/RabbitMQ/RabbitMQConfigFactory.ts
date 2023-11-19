import { type ConnectionSettings } from '@Shared/infrastructure/EventBus/RabbitMQ/ConnectionSettings'
import { type ExchangeSettings } from '@Shared/infrastructure/EventBus/RabbitMQ/ExchangeSettings'
import authConfig from '../config'

/**
 * Configuration settings for RabbitMQ.
 */
export interface RabbitMQConfig {
  /**
   * Connection settings for RabbitMQ.
   */
  connectionSettings: ConnectionSettings

  /**
   * Exchange settings for RabbitMQ.
   */
  exchangeSettings: ExchangeSettings

  /**
   * The maximum number of retries for RabbitMQ operations.
   */
  maxRetries: number

  /**
   * The time-to-live (TTL) for retrying RabbitMQ operations.
   */
  retryTtl: number
}

/**
 * Factory class for creating RabbitMQ configuration.
 */
export class RabbitMQConfigFactory {
  /**
   * Creates a RabbitMQ configuration based on the provided settings.
   * @returns The RabbitMQ configuration.
   */
  public static createConfig(): RabbitMQConfig {
    return authConfig.get('rabbitmq')
  }
}
