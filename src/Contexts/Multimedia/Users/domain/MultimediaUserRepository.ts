import { type MultimediaUser } from './MultimediaUser'
import { type MultimediaUserId } from './MultimediaUserId'

export interface MultimediaUserRepository {
  save: (user: MultimediaUser) => Promise<void>
  search: (id: MultimediaUserId) => Promise<MultimediaUser | null>
}
