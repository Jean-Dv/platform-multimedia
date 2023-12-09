import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { DeleteCategoryCommand } from './DeleteCategoryCommand'
import { type CategoryDeletor } from './CategoryDeletor'
import { type Command } from '@Shared/domain/Command'
import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'

export class DeleteCategoryCommandHandler
  implements CommandHandler<DeleteCategoryCommand>
{
  constructor(private readonly deletor: CategoryDeletor) {}

  public subscribedTo(): Command {
    return DeleteCategoryCommand
  }

  public async handle(command: DeleteCategoryCommand): Promise<void> {
    const id = new CategoryId(command.id)
    await this.deletor.run(id)
  }
}
