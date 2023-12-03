import { type Query } from './Query'
import { type Response } from './Response'

/**
 * Interface for a query handler, defining methods for the type
 * of query it is subscribed to and handling the query.
 *
 * @typeParam Q - The type of query the handler is subscribed to.
 * @typeParam R - The type of response the handler will provide.
 */
export interface QueryHandler<Q extends Query, R extends Response> {
  /**
   * Returns the type of query that this handler is subscribed to.
   *
   * @returns The type of query.
   */
  subscribedTo: () => Query

  /**
   * Handles the specified query and returns a response.
   *
   * @param query - The query to be handled.
   * @returns A Promise that resolves to the response of the query.
   */
  handle: (query: Q) => Promise<R>
}
