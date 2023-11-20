import bcrypt from 'bcrypt'
import { InternetMother } from './InternetMother'
export class BcryptMother {
  public static random(): string {
    return bcrypt.hashSync(InternetMother.random().password({ length }), 8)
  }

  public static hash(value: string): string {
    return bcrypt.hashSync(value, 8)
  }
}
