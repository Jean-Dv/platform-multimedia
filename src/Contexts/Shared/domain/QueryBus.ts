import { type Query } from './Query'
import { type Response } from './Response'

/**
 * Interface for a query bus, defining a method for
 * asking queries and receiving responses.
 */
export interface QueryBus {
  /**
   * Asks a query to the system and receives a response.
   *
   * @param query - The query to be asked.
   * @returns A Promise that resolves to the response of the query.
   */
  ask: <R extends Response>(query: Query) => Promise<R>
}
