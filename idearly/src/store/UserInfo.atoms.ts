import { atom } from "jotai";
import { IUserInfoResponse } from "../types";

export const userInfoAtom = atom<IUserInfoResponse>({
  memberId: '',
  email: '',
  name: '',
});
