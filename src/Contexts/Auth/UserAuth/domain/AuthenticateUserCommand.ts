import { Command } from '@Shared/domain/Command'

interface Params {
  email: string
  password: string
}

export class AuthenticateUserCommand extends Command {
  public readonly email: string
  public readonly password: string

  constructor({ email, password }: Params) {
    super()
    this.email = email
    this.password = password
  }
}
