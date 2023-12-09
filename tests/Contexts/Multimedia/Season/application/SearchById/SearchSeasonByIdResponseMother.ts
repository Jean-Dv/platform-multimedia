import { SeasonResponse } from '@Multimedia/Season/application/SeasonResponse'
import { type Season } from '@Multimedia/Season/domain/Season'
import { SeasonNotFound } from '@Multimedia/Season/domain/SeasonNotFound'

export class SearchSeasonByIdResponseMother {
  public static create(season: Season): SeasonResponse {
    return new SeasonResponse(season)
  }

  public static invalid(season: Season): SeasonNotFound {
    return new SeasonNotFound(`Season with id ${season.id.value} not found`)
  }
}
