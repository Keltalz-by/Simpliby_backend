import BuyerModel, { type Buyer } from '../buyer/buyer.model';

export class BuyerService {
  public async createBuyer(buyerData: Partial<Buyer>) {
    return await BuyerModel.create(buyerData);
  }
}
