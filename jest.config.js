module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper: {
    '@Shared/(.*)': '<rootDir>/src/Contexts/Shared/$1',
    '@Auth/(.*)': '<rootDir>/src/Contexts/Auth/$1',
    '@Multimedia/(.*)': '<rootDir>/src/Contexts/Multimedia/$1',
    '@Apps/(.*)': '<rootDir>/src/apps/$1',
    '@BackofficeMultimedia/(.*)':
      '<rootDir>/src/Contexts/BackofficeMultimedia/$1',
    '@BackofficeSubscriptions/(.*)':
      '<rootDir>/src/Contexts/BackofficeSubscriptions/$1',
    '@Subscriptions/(.*)': '<rootDir>/src/Contexts/Subscriptions/$1'
  }
}
