import { REMOTE_ASSETS_BASE_URL } from '../app/constants'

export function url(path = '') {
  if (import.meta.env.BASE_URL === undefined) {
    return `${import.meta.env.SITE}${path}`
  }
  return `${import.meta.env.SITE}${import.meta.env.BASE_URL}${path}`
}

export function asset(path: string) {
  // NOTE: Fetching remote assets from the Hugo admin dashboard Vercel dist.
  return `${REMOTE_ASSETS_BASE_URL}/${path}`
}
