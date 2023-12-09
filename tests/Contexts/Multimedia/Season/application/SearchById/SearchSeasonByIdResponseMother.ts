import { SeasonResponse } from '@Multimedia/Season/application/SeasonResponse'
import { type Season } from '@Multimedia/Season/domain/Season'

export class SearchSeasonByIdResponseMother {
  public static create(season: Season): SeasonResponse {
    return new SeasonResponse(season)
  }
}
