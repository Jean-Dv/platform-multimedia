import { TransactionId } from '@Subscriptions/Transactions/domain/TransactionId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

/**
 * Factory to create TransactionId value objects
 */
export class TransactionIdMother {
  /**
   * Creates a TransactionId value object.
   *
   * @param value - The value to create the TransactionId
   * @returns An instance of TransactionId
   */
  public static create(value: string): TransactionId {
    return new TransactionId(value)
  }

  /**
   * Creates a random TransactionId value object.
   *
   * @returns A random TransactionId value object
   */
  public static random(): TransactionId {
    return this.create(UuidMother.random())
  }
}
