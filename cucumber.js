const common = ['--require-module ts-node/register']

const authBackend = [
  ...common,
  'tests/apps/auth/backend/features/**/*.feature',
  '--require tests/apps/auth/backend/features/step_definitions/*.steps.ts'
].join(' ')

const multimediaBackend = [
  ...common,
  'tests/apps/multimedia/backend/features/**/*.feature',
  '--require tests/apps/multimedia/backend/features/step_definitions/*.steps.ts'
].join(' ')

const backofficeMultimediaBackend = [
  ...common,
  'tests/apps/backoffice-multimedia/backend/features/**/*.feature',
  '--require tests/apps/backoffice-multimedia/backend/features/step_definitions/*.steps.ts'
].join(' ')

const backofficeSubscriptionsBackend = [
  ...common,
  'tests/apps/backoffice-subscriptions/backend/features/**/*.feature',
  '--require tests/apps/backoffice-subscriptions/backend/features/step_definitions/*.steps.ts'
].join(' ')

const subscriptionsBackend = [
  ...common,
  'tests/apps/subscriptions/backend/features/**/*.feature',
  '--require tests/apps/subscriptions/backend/features/step_definitions/*.steps.ts'
].join(' ')

module.exports = {
  authBackend,
  multimediaBackend,
  backofficeMultimediaBackend,
  backofficeSubscriptionsBackend,
  subscriptionsBackend
}
