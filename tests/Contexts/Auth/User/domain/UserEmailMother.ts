import { UserEmail } from '@Auth/User/domain/UserEmail'
import { InternetMother } from '../../../Shared/domain/InternetMother'
import { WordMother } from '../../../Shared/domain/WordMother'

export class UserEmailMother {
  public static create(value: string): UserEmail {
    return new UserEmail(value)
  }

  public static random(): UserEmail {
    return new UserEmail(
      InternetMother.random().email({ provider: 'platform-multimedia.com' })
    )
  }

  public static invalid(): string {
    return WordMother.random({ max: 15 })
  }
}
