import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  name: string
  price: number
  duration: number
  description: string
}

/**
 * Command to create a plan.
 */
export class CreatePlanCommand extends Command {
  public readonly id: string
  public readonly name: string
  public readonly price: number
  public readonly duration: number
  public readonly description: string

  constructor({ id, name, price, duration, description }: Params) {
    super()
    this.id = id
    this.name = name
    this.price = price
    this.duration = duration
    this.description = description
  }
}
