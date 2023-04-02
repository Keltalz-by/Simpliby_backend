import UserModel, { type User } from '../user/user.model';

export class AuthService {
  public async signup(userData: Partial<User>) {
    return await UserModel.create(userData);
  }
}
