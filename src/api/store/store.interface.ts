import type IUser from '../user/user.interface';

export default interface IStore extends IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  photo: string;
  occupation: string;
  location: string;
}
