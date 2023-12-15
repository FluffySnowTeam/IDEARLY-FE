export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  competition: string[];
  team: string[];
}

export interface IUserInfoList {
  userInfo: IUserInfo;
}
