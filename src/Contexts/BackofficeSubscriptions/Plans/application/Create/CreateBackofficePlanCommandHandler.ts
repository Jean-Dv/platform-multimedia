import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateBackofficePlanCommand } from './CreateBackofficePlanCommand'
import { type BackofficePlanCreator } from './BackofficePlanCreator'
import { type Command } from '@Shared/domain/Command'
import { BackofficePlanId } from '../../domain/BackofficePlanId'
import { BackofficePlanName } from '../../domain/BackofficePlanName'
import { BackofficePlanPrice } from '../../domain/BackofficePlanPrice'
import { BackofficePlanDaysDuration } from '../../domain/BackofficePlanDaysDuration'
import { BackofficePlanDescription } from '../../domain/BackofficePlanDescription'

/**
 * Command handler for creating plans.
 */
export class CreateBackofficePlanCommandHandler
  implements CommandHandler<CreateBackofficePlanCommand>
{
  constructor(private readonly creator: BackofficePlanCreator) {}

  public subscribedTo(): Command {
    return CreateBackofficePlanCommand
  }

  public async handle(command: CreateBackofficePlanCommand): Promise<void> {
    const id = new BackofficePlanId(command.id)
    const name = new BackofficePlanName(command.name)
    const price = new BackofficePlanPrice(command.price)
    const duration = new BackofficePlanDaysDuration(command.duration)
    const description = new BackofficePlanDescription(command.description)

    await this.creator.run({
      id,
      name,
      price,
      duration,
      description
    })
  }
}
