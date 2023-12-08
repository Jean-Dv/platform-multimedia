import { type Role } from '@Auth/Roles/domain/Role'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'

export class RoleRepositoryMock implements RoleRepository {
  private readonly mockSave: jest.Mock

  constructor() {
    this.mockSave = jest.fn()
  }

  public async save(role: Role): Promise<void> {
    this.mockSave(role)
  }

  public assertSaveHaveBeenCalledWith(role: Role): void {
    expect(this.mockSave).toHaveBeenCalledWith(role)
  }
}
