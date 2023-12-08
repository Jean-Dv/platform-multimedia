import { type MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { type MultimediaRoleId } from '@Multimedia/Roles/domain/MultimediaRoleId'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'

export class MultimediaRoleRepositoryMock implements MultimediaRoleRepository {
  private readonly mockSave: jest.Mock
  private readonly mockSearch: jest.Mock
  private readonly multimediaRoles: MultimediaRole[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
  }

  public async save(role: MultimediaRole): Promise<void> {
    this.mockSave(role)
  }

  public async search(id: MultimediaRoleId): Promise<MultimediaRole | null> {
    this.mockSearch(id)
    return (
      this.multimediaRoles.find((role) => role.id.value === id.value) ?? null
    )
  }

  public assertSaveHaveBeenCalledWith(role: MultimediaRole): void {
    expect(this.mockSave).toHaveBeenCalledWith(role)
  }

  public assertSearchHaveBeenCalledWith(id: MultimediaRoleId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(id)
  }

  public searchMockReturnValue(multimediaRole: MultimediaRole): void {
    this.multimediaRoles.push(multimediaRole)
  }
}
