import { type CommandBus } from '@Shared/domain/CommandBus'
import { type Controller } from './Controller'
import { type Request, type Response } from 'express'
import { CreateMovieCommand } from '@Multimedia/Movies/domain/CreateMovieCommand'
import httpStatus from 'http-status'
import { InvalidArgumentError } from '@Shared/domain/value-objects/InvalidArgumentError'

type MoviePutRequest = Request & {
  body: {
    id: string
    title: string
    releaseDate: Date
    url: string
    duration: number
  }
}

/**
 * Controller for handling PUT requests related to movie updates.
 */
export class MoviePutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  /**
   * Executes the logic for handling a PUT request to update user information.
   * Validates the request body and dispatches a CreateUserCommand.
   * Responds with a success message or an error message if an exception occurs.
   *
   * @param req - The Express request object containing the user update information.
   * @param res - The Express response object.
   */
  public async run(req: MoviePutRequest, res: Response): Promise<void> {
    try {
      const { id, title, releaseDate, url, duration } = req.body
      const releaseDateParse = new Date(releaseDate)
      const createMovieCommand = new CreateMovieCommand({
        id,
        title,
        releaseDate: releaseDateParse,
        url,
        duration
      })
      await this.commandBus.dispatch(createMovieCommand)
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
      console.log(error)
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        ok: false
      })
    }
  }
}
