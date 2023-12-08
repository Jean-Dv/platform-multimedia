import { type MultimediaRole } from './MultimediaRole'
import { type MultimediaRoleId } from './MultimediaRoleId'

export interface MultimediaRoleRepository {
  save: (role: MultimediaRole) => Promise<void>
  search: (id: MultimediaRoleId) => Promise<MultimediaRole | null>
}
