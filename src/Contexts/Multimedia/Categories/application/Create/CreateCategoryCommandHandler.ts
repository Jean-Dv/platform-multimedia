import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateCategoryCommand } from './CreateCategoryCommand'
import { type CategoryCreator } from './CategoryCreator'
import { type Command } from '@Shared/domain/Command'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { CategoryName } from '@Multimedia/Categories/domain/CategoryName'

export class CreateCategoryCommandHandler
  implements CommandHandler<CreateCategoryCommand>
{
  constructor(private readonly creator: CategoryCreator) {}

  public subscribedTo(): Command {
    return CreateCategoryCommand
  }

  public async handle(command: CreateCategoryCommand): Promise<void> {
    const id = new CategoryId(command.id)
    const name = new CategoryName(command.name)
    await this.creator.run({ id, name })
  }
}
