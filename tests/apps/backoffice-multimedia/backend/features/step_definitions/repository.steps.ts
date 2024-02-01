import { Given } from '@cucumber/cucumber'
import { container } from '../../../../../../src/apps/backoffice-multimedia/backend/dependency-injection'
import { BackofficeMultimediaCategory } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategory'
import { BackofficeMultimediaCategoryId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaCategoryId'
import { BackofficeMultimediaCategoryName } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryName'
import { type BackofficeMultimediaCategoryRepository } from '@BackofficeMultimedia/Categories/domain/BackofficeMultimediaCategoryRepository'
import { type BackofficeMultimediaSerieRepository } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieRepository'
import { BackofficeMultimediaSerie } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerie'
import { BackofficeMultimediaSerieId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSerieId'
import { BackofficeMultimediaSerieTitle } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieTitle'
import { BackofficeMultimediaSerieReleaseYear } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieReleaseYear'
import { BackofficeMultimediaSerieSynopsis } from '@BackofficeMultimedia/Series/domain/BackofficeMultimediaSerieSynopsis'
import { type BackofficeMultimediaSeasonRepository } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonRepository'
import { BackofficeMultimediaSeason } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeason'
import { BackofficeMultimediaSeasonId } from '@BackofficeMultimedia/Shared/domain/BackofficeMultimediaSeasonId'
import { BackofficeMultimediaSeasonTitle } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonTitle'
import { BackofficeMultimediaSeasonReleaseYear } from '@BackofficeMultimedia/Seasons/domain/BackofficeMultimediaSeasonReleaseYear'

const categoriesRepository: BackofficeMultimediaCategoryRepository =
  container.get('BackofficeMultimedia.Categories.domain.CategoryRepository')

const serieRepository: BackofficeMultimediaSerieRepository = container.get(
  'BackofficeMultimedia.Series.domain.SerieRepository'
)

const seasonRepository: BackofficeMultimediaSeasonRepository = container.get(
  'BackofficeMultimedia.Seasons.domain.SeasonRepository'
)

Given('there is the category:', async (category: string) => {
  const { id, name } = JSON.parse(category)
  await categoriesRepository.save(
    new BackofficeMultimediaCategory(
      new BackofficeMultimediaCategoryId(id),
      new BackofficeMultimediaCategoryName(name)
    )
  )
})

Given('there is the serie:', async (serie: string) => {
  const { id, title, synopsis, releaseYear, categories } = JSON.parse(serie)
  await serieRepository.save(
    new BackofficeMultimediaSerie(
      new BackofficeMultimediaSerieId(id),
      new BackofficeMultimediaSerieTitle(title),
      new BackofficeMultimediaSerieReleaseYear(releaseYear),
      new BackofficeMultimediaSerieSynopsis(synopsis),
      categories.map(
        (category: string) => new BackofficeMultimediaCategoryId(category)
      )
    )
  )
})

Given('there is the season:', async (season: string) => {
  const { id, title, releaseYear, serie } = JSON.parse(season)
  await seasonRepository.save(
    new BackofficeMultimediaSeason(
      new BackofficeMultimediaSeasonId(id),
      new BackofficeMultimediaSeasonTitle(title),
      new BackofficeMultimediaSeasonReleaseYear(releaseYear),
      new BackofficeMultimediaSerieId(serie)
    )
  )
})
