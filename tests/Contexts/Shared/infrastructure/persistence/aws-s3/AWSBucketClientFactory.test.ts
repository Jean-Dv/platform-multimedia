import { AWSBucketClientFactory } from '@Shared/infrastructure/persistence/aws-s3/AWSBucketClientFactory'
import { S3Client } from '@aws-sdk/client-s3'

describe('AWSBucketClientFactory', () => {
  let client: S3Client
  const factory = AWSBucketClientFactory

  beforeEach(async () => {
    client = await factory.createClient('test', {
      bucketName: 'test',
      region: 'us-west-1',
      accessKeyId: '123',
      secretAccessKey: '123'
    })
  })

  afterEach(async () => {
    client.destroy()
  })

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(S3Client)
  })

  it('created a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', {
      bucketName: 'tes2',
      region: 'us-west-1',
      accessKeyId: '123',
      secretAccessKey: '123'
    })
    expect(newClient).toBeInstanceOf(S3Client)
    expect(newClient).not.toBe(client)
    newClient.destroy()
  })

  it('returns a client if it a already exists', async () => {
    const newClient = await factory.createClient('test', {
      bucketName: 'test',
      region: 'us-west-1',
      accessKeyId: '123',
      secretAccessKey: '123'
    })
    expect(newClient).toBeInstanceOf(S3Client)
    expect(newClient).toBe(client)
    newClient.destroy()
  })
})
