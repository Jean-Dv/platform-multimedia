import { SeasonsResponse } from '@Multimedia/Season/application/SeasonsResponse'
import { type Season } from '@Multimedia/Season/domain/Season'

export class SearchSeasonsByCriteriaResponseMother {
  public static create(seasons: Season[]): SeasonsResponse {
    return new SeasonsResponse(seasons)
  }
}
