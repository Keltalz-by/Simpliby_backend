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

  public async updateUser(userId: string, options: object) {
    return await UserModel.updateOne(
      { _id: userId },
      {
        $set: options
      }
    );
  }
}
