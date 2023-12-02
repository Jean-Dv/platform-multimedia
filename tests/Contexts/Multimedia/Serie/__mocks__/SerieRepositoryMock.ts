import { type Serie } from '@Multimedia/Serie/domain/Serie'

export class SerieRepositoryMock {
  private readonly saveMock: jest.Mock

  constructor() {
    this.saveMock = jest.fn()
  }

  public async save(serie: Serie): Promise<void> {
    this.saveMock(serie)
  }

  public assertSaveHaveBeenCalledWith(serie: Serie): void {
    expect(this.saveMock).toHaveBeenCalledWith(serie)
  }
}
