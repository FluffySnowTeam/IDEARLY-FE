export interface IUserRequest {
  email: string;
  password: string;
}

export interface IUserResponse {
  status: "success";
  data: IUserRequest;
}

export interface IUserSignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface IUserInfoResponse {
  memberId: string;
  email: string;
  name: string;
}