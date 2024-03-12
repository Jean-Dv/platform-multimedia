import { type Serie } from '@Multimedia/Serie/domain/Serie'
import { type SerieRepository } from '@Multimedia/Serie/domain/SerieRepository'
import { type CategoryName } from '@Multimedia/Shared/domain/Category/CategoryName'
import { type SerieId } from '@Multimedia/Shared/domain/Serie/SerieId'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

export class SerieRepositoryMock implements SerieRepository {
  private readonly saveMock: jest.Mock
  private readonly searchByCriteriaMock: jest.Mock
  private readonly updateSeriesByCategoryMock: jest.Mock
  private readonly searchByIdMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly series: Serie[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchByCriteriaMock = jest.fn()
    this.updateSeriesByCategoryMock = jest.fn()
    this.searchByIdMock = jest.fn()
    this.deleteMock = jest.fn()
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

  public async searchById(id: SerieId): Promise<Serie | null> {
    this.searchByIdMock(id)
    return this.series.find((serie) => serie.id.value === id.value) ?? null
  }

  public async delete(id: SerieId): Promise<void> {
    this.deleteMock(id)
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

  public assertSearchByIdHaveBeenCalledWith(id: SerieId): void {
    expect(this.searchByIdMock).toHaveBeenCalledWith(id)
  }

  public assertDeleteHaveBeenCalledWith(id: SerieId): void {
    expect(this.deleteMock).toHaveBeenCalledWith(id)
  }

  public searchByCriteriaMockReturnValue(series: Serie[]): void {
    this.series.push(...series)
  }

  public searchByIdMockReturnValue(serie: Serie): void {
    this.series.push(serie)
  }
}
