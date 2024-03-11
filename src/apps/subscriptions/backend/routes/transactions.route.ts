import { type Router } from 'express'
import { container } from '../dependency-injection'

function registerPostTransactions(router: Router): void {
  const controller = container.get(
    'Apps.subscriptions.controllers.TransactionPostController'
  )
  router.post('/transactions', controller.run.bind(controller))
}

export function register(router: Router): void {
  registerPostTransactions(router)
}
