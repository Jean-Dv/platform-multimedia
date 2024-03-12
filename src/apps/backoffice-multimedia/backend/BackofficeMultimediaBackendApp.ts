import 'module-alias/register'
import { type EventBus } from '@Shared/domain/EventBus'
import { container } from './dependency-injection'
import { Server } from './server'
import type * as http from 'http'
import { type RabbitMQConnection } from '@Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection'
import { DomainEventSubscribers } from '@Shared/infrastructure/EventBus/DomainEventSubscribers'
import backofficeMultimediaConfig from '@BackofficeMultimedia/Shared/infrastructure/config'

/**
 * Represents the main application for the multimedia backend.
 */
export class BackofficeMultimediaBackendApp {
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
    const port = backofficeMultimediaConfig.get('port') ?? '8002'
    this.server = new Server(port)
    await this.configureEventBus()
    await this.server.listen()
  }

  /**
   * Stops the authentication backend application.
   */
  public async stop(): Promise<void> {
    const rabbitMQConnection = container.get<RabbitMQConnection>(
      'BackofficeMultimedia.Shared.RabbitMQConnection'
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
      'BackofficeMultimedia.Shared.domain.EventBus'
    )
    const rabbitMQConnection = container.get<RabbitMQConnection>(
      'BackofficeMultimedia.Shared.RabbitMQConnection'
    )
    await rabbitMQConnection.connect()
    eventBus.addSubscribers(DomainEventSubscribers.from(container))
  }
}
