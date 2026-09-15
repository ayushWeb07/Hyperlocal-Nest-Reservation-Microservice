import { AbstractSchema } from '@app/common/database/abstract.schema';
import { Model, QueryFilter, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TSchema extends AbstractSchema> {
  constructor(protected readonly model: Model<TSchema>) {}

  async create(data: Omit<TSchema, '_id'>): Promise<TSchema> {
    const newDoc = new this.model({ ...data, _id: new Types.ObjectId() });
    return await newDoc.save();
  }

  async findMany(filter: QueryFilter<TSchema> = {}): Promise<TSchema[]> {
    const docs = await this.model.find(filter).lean<TSchema[]>(true);
    return docs;
  }

  async findOne(filter: QueryFilter<TSchema>): Promise<TSchema | null> {
    const doc = await this.model.findOne(filter).lean<TSchema | null>(true);

    if (!doc) {
      return null;
    }

    return doc;
  }

  async findById(id: string): Promise<TSchema | null> {
    const doc = await this.model.findById(id).lean<TSchema | null>(true);

    if (!doc) {
      return null;
    }

    return doc;
  }

  async findOneAndUpdate(
    queryFilter: QueryFilter<TSchema>,
    updateQuery: UpdateQuery<TSchema>,
  ): Promise<TSchema | null> {
    const doc = await this.model
      .findOneAndUpdate(queryFilter, updateQuery, { new: true })
      .lean<TSchema | null>(true);

    if (!doc) {
      return null;
    }

    return doc;
  }

  async findOneAndDelete(
    queryFilter: QueryFilter<TSchema>,
  ): Promise<TSchema | null> {
    const doc = await this.model
      .findOneAndDelete(queryFilter)
      .lean<TSchema | null>(true);

    if (!doc) {
      return null;
    }

    return doc;
  }
}
