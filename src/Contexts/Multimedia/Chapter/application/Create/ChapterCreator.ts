import { type ChapterRepository } from '../../domain/ChapterRepository'
import { Chapter } from '../../domain/Chapter'

export class ChapterCreator {
  constructor(private readonly repository: ChapterRepository) {}

  /**
   * Creates a new chapter with the provided information, saves it to the repository,
   * and publishes any domain events associated with chapter creation.
   *
   * @param params - The parameters needed to create the chapter.
   * @returns A new Chapter instance.
   */
  public async run(
    id: string,
    title: string,
    releaseYear: number,
    season: string,
    video: string
  ): Promise<void> {
    const chapter = Chapter.fromPrimitives({
      id,
      title,
      releaseYear,
      season,
      video
    })

    await this.repository.save(chapter)
  }
}
