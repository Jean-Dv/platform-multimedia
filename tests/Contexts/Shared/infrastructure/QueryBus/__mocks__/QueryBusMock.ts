import { type Query } from '@Shared/domain/Query'
import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Response } from '@Shared/domain/Response'

export default class QueryBusMock implements QueryBus {
  private readonly askSpy = jest.fn()
  private response: Response = {}

  public async ask<R extends Response>(query: Query): Promise<R> {
    this.askSpy(query)
    if (this.response instanceof Error) throw this.response
    return this.response as R
  }

  public assertAskSpyHaveBeenCalledWith(query: Query): void {
    expect(this.askSpy).toHaveBeenCalledWith(query)
  }

  public askMockReturnValue(response: Response): void {
    this.response = response
  }
}
