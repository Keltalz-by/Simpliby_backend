import UserModel from '../user/user.model';

export class UserService {
  public async findUserById(id: string) {
    return await UserModel.findById(id);
  }

  public async findUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  public async findUser(option: object) {
    return await UserModel.findOne(option);
  }

  public async findAllUsers() {
    return await UserModel.find({}).orFail().exec();
  }

  public async findAllBuyers() {
    const buyers = await UserModel.find({ __t: { $ne: 'STORE' } })
      .orFail()
      .exec();
    return buyers;
  }

  public async verifyUser(userId: string) {
    return await UserModel.updateOne(
      { _id: userId },
      {
        $set: { verified: true }
      }
    );
  }
}
