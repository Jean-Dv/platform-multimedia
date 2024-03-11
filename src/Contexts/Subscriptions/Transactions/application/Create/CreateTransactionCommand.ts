import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  planId: string
  planDuration: number
  userId: string
}

/**
 * Command to create a transaction.
 */
export class CreateTransactionCommand extends Command {
  public readonly id: string
  public readonly planId: string
  public readonly planDuration: number
  public readonly userId: string

  constructor({ id, planId, planDuration, userId }: Params) {
    super()
    this.id = id
    this.planId = planId
    this.planDuration = planDuration
    this.userId = userId
  }
}
