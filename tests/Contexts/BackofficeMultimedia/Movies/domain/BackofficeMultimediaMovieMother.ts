import { type CreateBackofficeMultimediaMovieCommand } from '@BackofficeMultimedia/Movies/application/Create/CreateBackofficeMultimediaMovieCommand'
import { BackofficeMultimediaMovie } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovie'
import { BackofficeMultimediaMovieId } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieId'
import { BackofficeMultimediaMovieReleaseYear } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieReleaseYear'
import { BackofficeMultimediaMovieSynopsis } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieSynopsis'
import { BackofficeMultimediaMovieTitle } from '@BackofficeMultimedia/Movies/domain/BackofficeMultimediaMovieTitle'
import { BackofficeMultimediaMovieIdMother } from './BackofficeMultimediaMovieIdMother'
import { BackofficeMultimediaMovieTitleMother } from './BackofficeMultimediaMovieTitleMother'
import { BackofficeMultimediaMovieReleaseYearMother } from './BackofficeMultimediaMovieReleaseYearMother'
import { BackofficeMultimediaMovieSynopsisMother } from './BackofficeMultimediaMovieSynopsisMother'
import { BackofficeMultimediaVideoId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaVideoId'
import { BackofficeMultimediaVideoIdMother } from '../../Shared/domain/BackofficeMultimediaVideoIdMother'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryIdMother } from '../../Shared/domain/BackofficeMultimediaCategoryIdMother'

export class BackofficeMultimediaMovieMother {
  public static create(
    id: BackofficeMultimediaMovieId,
    title: BackofficeMultimediaMovieTitle,
    releaseYear: BackofficeMultimediaMovieReleaseYear,
    synopsis: BackofficeMultimediaMovieSynopsis,
    categories: BackofficeMultimediaCategoryId[],
    videoId: BackofficeMultimediaVideoId
  ): BackofficeMultimediaMovie {
    return new BackofficeMultimediaMovie(
      id,
      title,
      releaseYear,
      synopsis,
      categories,
      videoId
    )
  }

  public static from(
    command: CreateBackofficeMultimediaMovieCommand
  ): BackofficeMultimediaMovie {
    return this.create(
      new BackofficeMultimediaMovieId(command.id),
      new BackofficeMultimediaMovieTitle(command.title),
      new BackofficeMultimediaMovieReleaseYear(command.releaseYear),
      new BackofficeMultimediaMovieSynopsis(command.synopsis),
      command.categories.map(
        (category) => new BackofficeMultimediaCategoryId(category.id)
      ),
      new BackofficeMultimediaVideoId(command.videoId)
    )
  }

  public static random(): BackofficeMultimediaMovie {
    return this.create(
      BackofficeMultimediaMovieIdMother.random(),
      BackofficeMultimediaMovieTitleMother.random(),
      BackofficeMultimediaMovieReleaseYearMother.random(),
      BackofficeMultimediaMovieSynopsisMother.random(),
      Array.from({ length: 3 }, () =>
        BackofficeMultimediaCategoryIdMother.random()
      ),
      BackofficeMultimediaVideoIdMother.random()
    )
  }
}
