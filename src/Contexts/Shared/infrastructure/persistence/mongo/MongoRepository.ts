import { type Document, type Collection, type MongoClient, UUID } from 'mongodb'
import { type AggregateRoot } from '../../../domain/AggregateRoot'
import { MongoCriteriaConverter } from './MongoCriteriaConverter'
import { type Criteria } from '@Shared/domain/criteria/Criteria'

interface UUIDMongoDocument {
  _id: UUID
  [key: string]: unknown
}

/**
 * This class is a base class for mongo repositories.
 * It provides some basic methods to persist and retrieve
 * aggregate roots.
 */
export abstract class MongoRepository<T extends AggregateRoot> {
  private readonly criteriaConverter: MongoCriteriaConverter

  constructor(private readonly _client: Promise<MongoClient>) {
    this.criteriaConverter = new MongoCriteriaConverter()
  }

  /**
   * Gets the name of the collection to use.
   *
   * @returns {string} The name of the collection.
   */
  protected abstract collectionName(): string

  /**
   * Gets the mongo client.
   *
   * @returns {MongoClient} The mongo client.
   */
  protected async client(): Promise<MongoClient> {
    return await this._client
  }

  /**
   * Gets the mongo collection.
   *
   * @returns {Collection} The mongo collection.
   */
  protected async collection(): Promise<Collection<UUIDMongoDocument>> {
    return (await this._client)
      .db()
      .collection<UUIDMongoDocument>(this.collectionName())
  }

  /**
   * This method persist data from an aggregate root.
   *
   * @param {string} id The id of the aggregate root.
   * @param {AggregateRoot} aggregateRoot The aggregate root to persist.
   * @returns {void}
   */
  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()
    const document = {
      ...aggregateRoot.toPrimitives(),
      createdAt: new Date(),
      deletedAt: null
    }
    await collection.updateOne(
      {
        _id: {
          $eq: new UUID(id)
        }
      },
      { $set: document },
      { upsert: true }
    )
  }

  /**
   * This method search an aggregate root by criteria specific.
   *
   * @param criteria - The criteria to search.
   * @returns A promise that resolves the aggregate root list.
   */
  protected async searchByCriteria<D extends Document>(
    criteria: Criteria
  ): Promise<D[]> {
    const query = this.criteriaConverter.convert(criteria)
    const collection = await this.collection()
    const filter = {
      ...query.filter,
      deletedAt: null
    }
    return await collection
      .find<D>(filter, {})
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .toArray()
  }

  /**
   * This method search an aggregate root by id.
   *
   * @param id - The id of the aggregate root.
   * @returns A promise that resolves the aggregate root.
   */
  protected async findById<D extends Document>(id: string): Promise<D | null> {
    const collection = await this.collection()
    const document = await collection.findOne<D>({
      _id: new UUID(id),
      deletedAt: null
    })
    return document
  }

  /**
   * This method delete soft a aggregate root.
   *
   * @param {string} id The id of the aggregate root.
   * @returns {T} The aggregate root.
   */
  protected async erase(id: string): Promise<void> {
    const collection = await this.collection()
    const document = {
      deletedAt: new Date()
    }
    await collection.updateOne({ id }, { $set: document }, { upsert: false })
  }
}
