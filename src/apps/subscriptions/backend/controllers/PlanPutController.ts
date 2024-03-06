import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import httpStatus from 'http-status'
import { NotFound } from '@Shared/domain/NotFound'
import { CreatePlanCommand } from '@Subscriptions/Plans/application/Create/CreatePlanCommand'

type PlanPutRequest = Request & {
  body: {
    id: string
    name: string
    price: number
    duration: number
    description: string
  }
}

/**
 * Controller for handling PUT requests to create a new plan.
 */
export class PlanPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: PlanPutRequest, res: Response): Promise<void> {
    try {
      const { id, name, price, duration, description } = req.body
      const createPlanCommand = new CreatePlanCommand({
        id,
        name,
        price,
        duration,
        description
      })
      await this.commandBus.dispatch(createPlanCommand)
      res.status(httpStatus.CREATED).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).json({
          ok: false,
          error: error.message
        })
        return
      }
      if (error instanceof NotFound) {
        res.status(httpStatus.NOT_FOUND).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
