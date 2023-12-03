import { type Query } from '@Shared/domain/Query'
import { type QueryHandler } from '@Shared/domain/QueryHandler'
import { QueryNotRegisteredError } from '@Shared/domain/QueryNotRegisteredError'
import { type Response } from '@Shared/domain/Response'

/**
 * Represents a collection of query handlers, organized as a Map
 * where the keys are query types and the values are their respective
 * handlers.
 */
export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super()
    queryHandlers.forEach((queryHandler) =>
      this.set(queryHandler.subscribedTo(), queryHandler)
    )
  }

  /**
   * Gets the query handler for the specified query type.
   * Throws a QueryNotRegisteredError if the query type is not registered.
   *
   * @param query - The query instance or its type.
   * @returns The query handler for the specified query type.
   * @throws QueryNotRegisteredError if the query type is not registered.
   */
  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor)
    if (queryHandler === null || queryHandler === undefined) {
      throw new QueryNotRegisteredError(query)
    }
    return queryHandler
  }
}
