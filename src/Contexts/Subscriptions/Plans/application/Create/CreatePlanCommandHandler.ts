import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreatePlanCommand } from './CreatePlanCommand'
import { type PlanCreator } from './PlanCreator'
import { type Command } from '@Shared/domain/Command'
import { PlanId } from '../../domain/PlanId'
import { PlanName } from '../../domain/PlanName'
import { PlanPrice } from '../../domain/PlanPrice'
import { PlanDaysDuration } from '../../domain/PlanDaysDuration'
import { PlanDescription } from '../../domain/PlanDescription'

/**
 * Command handler for creating plans.
 */
export class CreatePlanCommandHandler
  implements CommandHandler<CreatePlanCommand>
{
  constructor(private readonly creator: PlanCreator) {}

  public subscribedTo(): Command {
    return CreatePlanCommand
  }

  public async handle(command: CreatePlanCommand): Promise<void> {
    const id = new PlanId(command.id)
    const name = new PlanName(command.name)
    const price = new PlanPrice(command.price)
    const duration = new PlanDaysDuration(command.duration)
    const description = new PlanDescription(command.description)

    await this.creator.run({
      id,
      name,
      price,
      duration,
      description
    })
  }
}
