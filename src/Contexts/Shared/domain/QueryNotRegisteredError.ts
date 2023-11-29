import { type Query } from './Query'

/**
 * Represents an error thrown when a query is not registered in the system.
 */
export class QueryNotRegisteredError extends Error {
  constructor(query: Query) {
    super(
      `The query <${query.constructor.name}> hasn't a query handler associated`
    )
  }
}
