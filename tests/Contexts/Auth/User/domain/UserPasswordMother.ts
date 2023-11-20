import { UserPassword } from '@Auth/User/domain/UserPassword'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class UserPasswordMother {
  public static create(value: string): UserPassword {
    return new UserPassword(value)
  }

  public static random(): UserPassword {
    return new UserPassword(InternetMother.random().password({ length: 20 }))
  }

  public static invalid(): string {
    return WordMother.random({ max: 7 })
  }
}
