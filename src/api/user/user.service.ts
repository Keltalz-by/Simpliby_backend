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

  public async verifyUser(userId: string) {
    return await UserModel.updateOne(
      { _id: userId },
      {
        $set: { verified: true }
      }
    );
  }
}
