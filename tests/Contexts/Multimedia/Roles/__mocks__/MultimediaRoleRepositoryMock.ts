import { type MultimediaRole } from '@Multimedia/Roles/domain/MultimediaRole'
import { type MultimediaRoleRepository } from '@Multimedia/Roles/domain/MultimediaRoleRepository'

export class MultimediaRoleRepositoryMock implements MultimediaRoleRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(role: MultimediaRole): Promise<void> {
    this.mockSave(role)
  }

  public assertSaveHaveBeenCalledWith(role: MultimediaRole): void {
    expect(this.mockSave).toHaveBeenCalledWith(role)
  }
}
