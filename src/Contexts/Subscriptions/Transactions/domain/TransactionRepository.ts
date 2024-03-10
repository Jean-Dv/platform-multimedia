import { type Transaction } from './Transaction'

/**
 * Transaction repository interface.
 */
export interface TransactionRepository {
  /**
   * Save a new transaction.
   *
   * @param transaction - The transaction to save.
   */
  save: (transaction: Transaction) => Promise<void>
}
