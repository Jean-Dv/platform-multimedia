import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateTransactionCommand } from './CreateTransactionCommand'
import { type TransactionCreator } from './TransactionCreator'
import { type Command } from '@Shared/domain/Command'
import { TransactionId } from '@Subscriptions/Transactions/domain/TransactionId'
import { PlanId } from '@Subscriptions/Shared/domain/PlanId'
import { PlanDaysDuration } from '@Subscriptions/Shared/domain/PlanDaysDuration'
import { UserId } from '@Subscriptions/Shared/domain/UserId'

/**
 * Command handler for creating transactions.
 */
export class CreateTransactionCommandHandler
  implements CommandHandler<CreateTransactionCommand>
{
  constructor(private readonly creator: TransactionCreator) {}

  public subscribedTo(): Command {
    return CreateTransactionCommand
  }

  public async handle(command: CreateTransactionCommand): Promise<void> {
    const id = new TransactionId(command.id)
    const planId = new PlanId(command.planId)
    const planDuration = new PlanDaysDuration(command.planDuration)
    const userId = new UserId(command.userId)
    await this.creator.run({
      id,
      planId,
      planDuration,
      userId
    })
  }
}
