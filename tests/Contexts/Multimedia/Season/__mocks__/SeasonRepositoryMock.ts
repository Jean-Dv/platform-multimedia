import { type Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'
import { type SeasonId } from '@Multimedia/Shared/domain/Season/SeasonId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class SeasonRepositoryMock implements SeasonRepository {
  private readonly mockSave: jest.Mock
  private readonly mockMatching: jest.Mock
  private readonly searchByIdMock: jest.Mock
  private readonly seasons: Season[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockMatching = jest.fn()
    this.searchByIdMock = jest.fn()
  }

  public async save(season: Season): Promise<void> {
    this.mockSave(season)
  }

  public async matching(criteria: Criteria): Promise<Season[]> {
    this.mockMatching(criteria)
    return this.seasons
  }

  public async searchById(id: SeasonId): Promise<Season | null> {
    this.searchByIdMock(id)
    return this.seasons.find((season) => season.id.value === id.value) ?? null
  }

  public assertSaveHaveBeenCalledWith(season: Season): void {
    expect(this.mockSave).toHaveBeenCalledWith(season)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.mockMatching).toHaveBeenCalled()
  }

  public assertSearchByIdHaveBeenCalledWith(id: SeasonId): void {
    expect(this.searchByIdMock).toHaveBeenCalledWith(id)
  }

  public searchByCriteriaMockReturnValue(seasons: Season[]): void {
    this.seasons.push(...seasons)
  }

  public searchByIdMockReturnValue(season: Season): void {
    this.seasons.push(season)
  }
}
