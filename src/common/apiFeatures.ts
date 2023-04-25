import { type Document, type Model, type model } from 'mongoose';

export type QueryObj = Record<string, string>;

export class APIFeatures {
  public query: Model<Document<{}, {}, {}>, typeof model>;
  public queryString: QueryObj;

  constructor(query: Model<Document<{}, {}, {}>, typeof model>, queryString: QueryObj) {
    this.query = query;
    this.queryString = queryString;

    void this.filter();
    void this.sort();
    void this.limitFields();
    void this.pagination();
  }

  // TypeOf<typeof createStoreSchema>

  public async filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => {
      const { [el]: removeEl, ...other } = queryObj;
      return other;
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    await this.query.find(JSON.parse(queryStr));

    return this;
  }

  public async sort() {
    if (this.queryString.sort.length > 0) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      await this.query.find().sort(sortBy);
    }
    await this.query.find().sort('-createdAt');

    return this;
  }

  public async limitFields() {
    if (this.queryString.fields.length > 0) {
      const fields = this.queryString.fields.split(',').join(' ');
      await this.query.find().select(fields);
    }
    await this.query.find().select('-__v');

    return this;
  }

  public async pagination() {
    const page = Number(this.queryString.page) * 1 ?? 1;
    const limit = Number(this.queryString.limit) * 1 ?? 10;
    const skip = (page - 1) * limit;

    await this.query.find().skip(skip).limit(limit);

    return this;
  }
}
