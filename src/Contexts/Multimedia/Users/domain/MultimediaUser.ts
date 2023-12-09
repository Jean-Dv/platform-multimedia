import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { MultimediaUserId } from './MultimediaUserId'

export class MultimediaUser extends AggregateRoot {
  public readonly id: MultimediaUserId

  constructor(id: MultimediaUserId) {
    super()
    this.id = id
  }

  public static fromPrimitives(plainData: { id: string }): MultimediaUser {
    return new MultimediaUser(new MultimediaUserId(plainData.id))
  }

  public toPrimitives(): {
    id: string
  } {
    return {
      id: this.id.value
    }
  }
}
