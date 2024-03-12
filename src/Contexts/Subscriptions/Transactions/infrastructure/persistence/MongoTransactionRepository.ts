import { MongoRepository } from '@Shared/infrastructure/persistence/mongo/MongoRepository'
import { type Transaction } from '@Subscriptions/Transactions/domain/Transaction'
import { type TransactionRepository } from '@Subscriptions/Transactions/domain/TransactionRepository'

/**
 * Mongo repository for transactions.
 */
export class MongoTransactionRepository
  extends MongoRepository<Transaction>
  implements TransactionRepository
{
  public async save(transaction: Transaction): Promise<void> {
    await this.persist(transaction.id.value, transaction)
  }

  protected collectionName(): string {
    return 'transactions'
  }
}
