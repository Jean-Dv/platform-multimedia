import { type DeleteSerieCommand } from '@Multimedia/Serie/application/Delete/DeleteSerieCommand'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { SerieIdMother } from '../../../Shared/domain/SerieIdMother'

export class DeleteSerieCommandMother {
  public static create(id: SerieId): DeleteSerieCommand {
    return {
      id: id.value
    }
  }

  public static random(): DeleteSerieCommand {
    return this.create(SerieIdMother.random())
  }
}
