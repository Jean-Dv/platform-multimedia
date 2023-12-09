import { type Role } from '@Auth/Roles/domain/Role'
import { type RoleRepository } from '@Auth/Roles/domain/RoleRepository'
import { type RoleName } from '@Auth/Shared/domain/Roles/RoleName'

export class RoleRepositoryMock implements RoleRepository {
  private readonly mockSave: jest.Mock
  private readonly mockSearch: jest.Mock
  private readonly roles: Role[] = []

  constructor() {
    this.mockSave = jest.fn()
    this.mockSearch = jest.fn()
  }

  public async save(role: Role): Promise<void> {
    this.mockSave(role)
  }

  public async search(name: RoleName): Promise<Role | null> {
    this.mockSearch(name)
    return this.roles.find((role) => role.name.value === name.value) ?? null
  }

  public assertSaveHaveBeenCalledWith(role: Role): void {
    expect(this.mockSave).toHaveBeenCalledWith(role)
  }

  public assertSearchHaveBeenCalledWith(name: RoleName): void {
    expect(this.mockSearch).toHaveBeenCalledWith(name)
  }

  public searchMockReturnValue(role: Role): void {
    this.roles.push(role)
  }
}
