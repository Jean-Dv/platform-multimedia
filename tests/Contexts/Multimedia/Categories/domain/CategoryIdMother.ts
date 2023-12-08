import { CategoryId } from '@Multimedia/Categories/domain/CategoryId'
import { UuidMother } from '../../../Shared/domain/UuidMother'

export class CategoryIdMother {
  public static create(id: string): CategoryId {
    return new CategoryId(id)
  }

  public static random(): CategoryId {
    return this.create(UuidMother.random())
  }
}
