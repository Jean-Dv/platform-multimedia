import { type QueryBus } from '@Shared/domain/QueryBus'
import { type Middleware } from './Middleware'
import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '@Auth/Shared/infrastructure/config'
import { SearchMultimediaRoleByIdQuery } from '@Multimedia/Roles/application/SearchById/SearchMultimediaRoleByIdQuery'
import { type MultimediaRoleResponse } from '@Multimedia/Roles/application/MultimediaRoleResponse'

export class IsAdminMiddleware implements Middleware {
  constructor(private readonly queryBus: QueryBus) {}

  public async run(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1] as string
      const { roleId } = jwt.verify(token, authConfig.get('auth.secret')) as {
        userId: string
        roleId: string
      }
      const isAdmin = await this.isAdmin(roleId)
      if (!isAdmin) {
        res.status(401).json({
          ok: false,
          data: {
            message: 'Unauthorized'
          }
        })
        return
      }
      next()
    } catch (error) {}
  }

  private async isAdmin(roleId: string): Promise<boolean> {
    const query = new SearchMultimediaRoleByIdQuery(roleId)
    const { role } = await this.queryBus.ask<MultimediaRoleResponse>(query)
    return role.name === 'admin'
  }
}
