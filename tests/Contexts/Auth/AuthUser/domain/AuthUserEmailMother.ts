import { AuthEmail } from '@Auth/UserAuth/domain/AuthEmail'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class AuthUserEmailMother {
  public static create(value: string): AuthEmail {
    return new AuthEmail(value)
  }

  public static random(): AuthEmail {
    return new AuthEmail(
      InternetMother.random().email({ provider: 'platform-multimedia.com' })
    )
  }

  public static invalid(): string {
    return WordMother.random({ max: 15 })
  }
}
