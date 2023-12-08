import { type MultimediaRole } from './MultimediaRole'

export interface MultimediaRoleRepository {
  save: (role: MultimediaRole) => Promise<void>
}
