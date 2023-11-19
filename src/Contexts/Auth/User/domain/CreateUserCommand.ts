import { Command } from '@Shared/domain/Command'

interface Params {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  repeatPassword: string
}

export class CreateUserCommand extends Command {
  public readonly id: string
  public readonly firstName: string
  public readonly lastName: string
  public readonly email: string
  public readonly password: string
  public readonly repeatPassword: string

  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    repeatPassword
  }: Params) {
    super()
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.repeatPassword = repeatPassword
  }
}
