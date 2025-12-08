import { IUser } from './user.model';

export interface IAuth {
  token: { accessToken: string };
  user: IUser;
}
