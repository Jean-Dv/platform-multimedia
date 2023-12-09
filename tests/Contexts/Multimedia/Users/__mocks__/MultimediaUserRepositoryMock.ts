import { type MultimediaUser } from '@Multimedia/Users/domain/MultimediaUser'
import { type MultimediaUserId } from '@Multimedia/Users/domain/MultimediaUserId'
import { type MultimediaUserRepository } from '@Multimedia/Users/domain/MultimediaUserRepository'

export class MultimediaUserRepositoryMock implements MultimediaUserRepository {
  private readonly saveMock: jest.Mock
  private readonly searchMock: jest.Mock
  private readonly users: MultimediaUser[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.searchMock = jest.fn()
  }

  public async save(user: MultimediaUser): Promise<void> {
    this.saveMock(user)
  }

  public async search(id: MultimediaUserId): Promise<MultimediaUser | null> {
    this.searchMock(id)
    return this.users.find((user) => user.id.value === id.value) ?? null
  }

  public assertSaveHaveBeenCalledWith(user: MultimediaUser): void {
    expect(this.saveMock).toHaveBeenCalledWith(user)
  }

  public assertSearchHaveBeenCalledWith(id: MultimediaUserId): void {
    expect(this.searchMock).toHaveBeenCalledWith(id)
  }

  public searchMockReturnValue(user: MultimediaUser): void {
    this.users.push(user)
  }
}
