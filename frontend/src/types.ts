export interface IUser {
  name: string;
  surname: string;
  login: string;
  password: string;
  avatar?: File;
}

export type ILoginUser = Pick<IUser, "login" | "password">