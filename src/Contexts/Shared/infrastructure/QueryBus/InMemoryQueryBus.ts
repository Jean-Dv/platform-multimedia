import { type QueryBus } from '@Shared/domain/QueryBus'
import { type QueryHandlers } from './QueryHandlers'
import { type Response } from '@Shared/domain/Response'
import { type Query } from '@Shared/domain/Query'

/**
 * Represents an in-memory query bus that executes queries by using a
 * collection of query handlers.
 */
export class InMemoryQueryBus implements QueryBus {
  constructor(private readonly queryHandlersInformation: QueryHandlers) {}

  /**
   * Asks a query to the in-memory query bus and receives a response.
   *
   * @param query - The query to be asked.
   * @typeParam R - The type of response expected for the query.
   * @returns A Promise that resolves to the response of the query.
   */
  public async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query)
    return await ((await handler.handle(query)) as Promise<R>)
  }
}
