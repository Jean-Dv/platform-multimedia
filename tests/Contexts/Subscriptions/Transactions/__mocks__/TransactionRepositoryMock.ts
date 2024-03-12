import { type Transaction } from '@Subscriptions/Transactions/domain/Transaction'
import { type TransactionRepository } from '@Subscriptions/Transactions/domain/TransactionRepository'

export class TransactionRepositoryMock implements TransactionRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(transaction: Transaction): Promise<void> {
    this.mockSave(transaction)
  }

  /**
   * Asserts that the `save` method was called with the given transaction.
   *
   * @param transaction - The transaction to assert that was saved
   */
  public assertSaveHaveBeenCalledWith(transaction: Transaction): void {
    expect(this.mockSave).toHaveBeenCalledWith(transaction)
  }
}
