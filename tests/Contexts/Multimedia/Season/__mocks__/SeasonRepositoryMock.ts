import { type Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class SeasonRepositoryMock implements SeasonRepository {
  private readonly mockSave: jest.Mock
  private readonly mockMatching: jest.Mock
  private readonly seasons: Season[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockMatching = jest.fn()
  }

  public async save(season: Season): Promise<void> {
    this.mockSave(season)
  }

  public async matching(criteria: Criteria): Promise<Season[]> {
    this.mockMatching(criteria)
    return this.seasons
  }

  public assertSaveHaveBeenCalledWith(season: Season): void {
    expect(this.mockSave).toHaveBeenCalledWith(season)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.mockMatching).toHaveBeenCalled()
  }

  public searchByCriteriaMockReturnValue(seasons: Season[]): void {
    this.seasons.push(...seasons)
  }
}
