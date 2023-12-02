import { type CommandHandler } from '@Shared/domain/CommandHandler'
import { type ChapterCreator } from './ChapterCreator'
import { type Command } from '@Shared/domain/Command'
import { CreateChapterCommand } from './CreateChapterCommand'
import { ChapterId } from '../../domain/ChapterId'
import { SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { ChapterTitle } from '../../domain/ChapterTitle'
import { ChapterDuration } from '../../domain/ChapterDuration'
import { ChapterReleaseDate } from '../../domain/ChapterReleaseDate'

export class CreateChapterCommandHandler
  implements CommandHandler<CreateChapterCommand>
{
  constructor(private readonly chapterCreator: ChapterCreator) {}

  public subscribedTo(): Command {
    return CreateChapterCommand
  }

  public async handle(command: CreateChapterCommand): Promise<void> {
    const id = new ChapterId(command.id)
    const seasonId = new SeasonId(command.seasonId)
    const title = new ChapterTitle(command.title)
    const duration = new ChapterDuration(command.duration)
    const releaseDate = new ChapterReleaseDate(command.releaseDate)
    await this.chapterCreator.run({
      id,
      seasonId,
      title,
      duration,
      releaseDate
    })
  }
}
