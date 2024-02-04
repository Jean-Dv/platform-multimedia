import { Movie } from '@Multimedia/Movies/domain/Movie'
import { type MovieId } from '@Multimedia/Movies/domain/MovieId'
import { type MovieReleaseYear } from '@Multimedia/Movies/domain/MovieReleaseYear'
import { type MovieTitle } from '@Multimedia/Movies/domain/MovieTitle'
import { MovieIdMother } from './MovieIdMother'
import { MovieTitleMother } from './MovieTitleMother'
import { MovieReleaseYearMother } from './MovieReleaseYearMother'
import { type MovieSynopsis } from '@Multimedia/Movies/domain/MovieSynopsis'
import { type CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { type VideoId } from '@Multimedia/Shared/domain/Video/VideoId'
import { MovieSynopsisMother } from './MovieSynopsisMother'
import { CategoryIdMother } from '../../Categories/domain/CategoryIdMother'
import { VideoIdMother } from '../../Shared/domain/VideoIdMother'

export class MovieMother {
  public static create(
    id: MovieId,
    title: MovieTitle,
    releaseYear: MovieReleaseYear,
    synopsis: MovieSynopsis,
    categories: CategoryId[],
    videoId: VideoId
  ): Movie {
    return new Movie(id, title, releaseYear, synopsis, categories, videoId)
  }

  public static random(): Movie {
    return this.create(
      MovieIdMother.random(),
      MovieTitleMother.random(),
      MovieReleaseYearMother.random(),
      MovieSynopsisMother.random(),
      [CategoryIdMother.random()],
      VideoIdMother.random()
    )
  }
}
