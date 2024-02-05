import { BackofficeMultimediaBackendApp } from './BackofficeMultimediaBackendApp'

try {
  void new BackofficeMultimediaBackendApp().start()
} catch (error) {
  console.error(error)
  process.exit(1)
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err)
  process.exit(1)
})
