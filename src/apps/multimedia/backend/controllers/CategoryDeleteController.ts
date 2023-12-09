import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { DeleteCategoryCommand } from '@Multimedia/Categories/application/Delete/DeleteCategoryCommand'
import { NotFound } from '@Shared/domain/NotFound'

export class CategoryDeleteController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  public async run(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const deleteCategoryCommand = new DeleteCategoryCommand({ id })
      await this.commandBus.dispatch(deleteCategoryCommand)
      res.status(200).json({
        ok: true
      })
    } catch (error) {
      if (error instanceof NotFound) {
        res.status(404).json({
          ok: false,
          error: error.message
        })
        return
      }
      console.log(error)
      res.status(500).json({
        ok: false
      })
    }
  }
}
