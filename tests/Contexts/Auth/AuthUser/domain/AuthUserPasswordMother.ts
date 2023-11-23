import { AuthPassword } from '@Auth/UserAuth/domain/AuthPassword'
import { BcryptMother } from '../../../Shared/domain/BcryptMother'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class AuthUserPasswordMother {
  public static create(value: string): AuthPassword {
    return new AuthPassword(value)
  }

  public static random(): AuthPassword {
    return new AuthPassword(InternetMother.random().password({ length: 20 }))
  }

  public static hashed(value: string): AuthPassword {
    return new AuthPassword(BcryptMother.hash(value))
  }

  public static invalid(): string {
    return WordMother.random({ max: 7 })
  }
}
