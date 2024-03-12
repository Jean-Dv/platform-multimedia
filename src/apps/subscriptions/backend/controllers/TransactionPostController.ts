import { type Response, type Request } from 'express'
import { type Controller } from './Controller'
import { type CommandBus } from '@Shared/domain/CommandBus'
import httpStatus from 'http-status'
import { Payment, MercadoPagoConfig } from 'mercadopago'
import subscriptionsConfig from '@Subscriptions/Shared/infrastructure/config'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'
import { CreateTransactionCommand } from '@Subscriptions/Transactions/application/Create/CreateTransactionCommand'
import { v4 as uuidv4 } from 'uuid'
import { type PaymentResponse } from 'mercadopago/dist/clients/payment/commonTypes'

type TransactionPostRequest = Request & {
  body: {
    data: {
      id: string
    }
  }
}

const client = new MercadoPagoConfig({
  accessToken: subscriptionsConfig.get('mercadopago.accessToken')
})

/**
 * Controller for handling POST requests to create a new transaction.
 */
export class TransactionPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: TransactionPostRequest, res: Response): Promise<void> {
    try {
      const payment = await new Payment(client).get({ id: req.body.data.id })

      const { planId, planDuration, userId } =
        await this.validatePayment(payment)

      const createTransactionCommand = new CreateTransactionCommand({
        id: uuidv4(),
        planId,
        planDuration,
        userId
      })
      await this.commandBus.dispatch(createTransactionCommand)
      res.status(httpStatus.CREATED).json({
        success: true
      })
    } catch (error) {
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }

  /**
   * Validate and extract the planId, planDuration and userId from the payment response.
   *
   * @param payment - Payment response from MercadoPago
   * @returns A planId, planDuration and userId from the payment response
   */
  private async validatePayment(payment: PaymentResponse): Promise<{
    planId: string
    planDuration: number
    userId: string
  }> {
    if (payment.additional_info?.items == null)
      throw new InvalidArgumentError('Invalid payment')
    const paymentItemData = payment.additional_info?.items?.[0]
    if (paymentItemData.id == null || paymentItemData.description == null)
      throw new InvalidArgumentError('Invalid payment')
    const dataOfDescription = JSON.parse(paymentItemData.description)
    if (dataOfDescription.duration == null || dataOfDescription.userId == null)
      throw new InvalidArgumentError('Invalid payment')
    return {
      planId: paymentItemData.id,
      planDuration: dataOfDescription.duration,
      userId: dataOfDescription.userId
    }
  }
}
