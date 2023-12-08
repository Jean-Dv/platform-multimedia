import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  name: string
}

export class CreateCategoryCommand extends Command {
  public readonly id: string
  public readonly name: string

  constructor({ id, name }: Params) {
    super()
    this.id = id
    this.name = name
  }
}
