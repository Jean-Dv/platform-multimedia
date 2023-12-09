import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class SerieRepositoryMock implements SerieRepository {
  private readonly saveMock: jest.Mock
  private readonly searchByCriteriaMock: jest.Mock
  private readonly updateSeriesByCategoryMock: jest.Mock
  private readonly series: Serie[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchByCriteriaMock = jest.fn()
    this.updateSeriesByCategoryMock = jest.fn()
  }

  public async save(serie: Serie): Promise<void> {
    this.saveMock(serie)
  }

  public async matching(criteria: Criteria): Promise<Serie[]> {
    this.searchByCriteriaMock(criteria)
    return this.series
  }

  public async updateSeriesByCategory(name: CategoryName): Promise<void> {
    this.updateSeriesByCategoryMock(name)
  }

  public assertSaveHaveBeenCalledWith(serie: Serie): void {
    expect(this.saveMock).toHaveBeenCalledWith(serie)
  }

  public assertMatchingHaveBeenCalled(): void {
    expect(this.searchByCriteriaMock).toHaveBeenCalled()
  }

  public assertUpdateSeriesByCategoryHaveBeenCalledWith(
    name: CategoryName
  ): void {
    expect(this.updateSeriesByCategoryMock).toHaveBeenCalledWith(name)
  }

  public searchByCriteriaMockReturnValue(series: Serie[]): void {
    this.series.push(...series)
  }
}
