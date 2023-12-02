import { type Season } from '@Multimedia/Season/domain/Season'
import { type SeasonRepository } from '@Multimedia/Season/domain/SeasonRepository'

export class SeasonRepositoryMock implements SeasonRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(season: Season): Promise<void> {
    this.mockSave(season)
  }

  public assertSaveHaveBeenCalledWith(season: Season): void {
    expect(this.mockSave).toHaveBeenCalledWith(season)
  }
}
