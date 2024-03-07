import type * as http from 'http'
import { Server } from './server'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { type EventBus } from '@Shared/domain/EventBus'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'
import { container } from './dependency-injection'

/**
 * Represents the main application for the subscription backend.
 */
export class SubscriptionBackendApp {
  public server?: Server

  /**
   * Gets the HTTP server instance.
   * @returns The HTTP server instance.
   */
  public getHttpServer(): http.Server | undefined {
    return this.server?.getHttpServer()
  }

  /**
   * Starts the authentication backend application.
   */
  public async start(): Promise<void> {
    const port = process.env.PORT ?? '8001'
    this.server = new Server(port)
    await this.configureEventBus()
    await this.server.listen()
  }

  /**
   * Stops the authentication backend application.
   */
  public async stop(): Promise<void> {
    const rabbitMQConnection = container.get<RabbitMQConnection>(
      'Subscriptions.Shared.RabbitMQConnection'
    )
    await rabbitMQConnection.close()
    await this.server?.stop()
  }

  /**
   * Configures the event bus for the authentication backend application.
   * Connects to RabbitMQ and adds domain event subscribers.
   */
  private async configureEventBus(): Promise<void> {
    const eventBus = container.get<EventBus>(
      'Subscriptions.Shared.domain.EventBus'
    )
    const rabbitMQConnection = container.get<RabbitMQConnection>(
      'Subscriptions.Shared.RabbitMQConnection'
    )
    await rabbitMQConnection.connect()
    eventBus.addSubscribers(DomainEventSubscribers.from(container))
  }
}
