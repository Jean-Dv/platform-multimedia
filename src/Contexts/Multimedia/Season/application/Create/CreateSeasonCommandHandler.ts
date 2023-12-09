import { SeasonReleaseDate } from '@Multimedia/Season/domain/SeasonReleaseDate'
import { SeasonTitle } from '@Multimedia/Season/domain/SeasonTitle'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type Command } from '@Shared/domain/Command'
import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { CreateSeasonCommand } from './CreateSeasonCommand'
import { type SeasonCreator } from './SeasonCreator'

export class CreateSeasonCommandHandler
  implements CommandHandler<CreateSeasonCommand>
{
  constructor(private readonly seasonCreator: SeasonCreator) {}
  public subscribedTo(): Command {
    return CreateSeasonCommand
  }

  public async handle(command: CreateSeasonCommand): Promise<void> {
    const id = new SeasonId(command.id)
    const serieId = new SerieId(command.serieId)
    const title = new SeasonTitle(command.title)
    const releaseDate = new SeasonReleaseDate(command.releaseDate)
    await this.seasonCreator.run({
      id,
      serieId,
      title,
      releaseDate
    })
  }
}
