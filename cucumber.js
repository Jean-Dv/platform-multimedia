const common = ['--require-module ts-node/register']

const authBackend = [
  ...common,
  'tests/apps/auth/backend/features/**/*.feature',
  '--require tests/apps/auth/backend/features/step_definitions/*.steps.ts'
].join(' ')

module.exports = {
  authBackend
}
