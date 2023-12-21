import { atom } from "jotai";
import type { IUserInfoResponse } from "../types";

export const userInfoAtom = atom<IUserInfoResponse>({
  memberId: '',
  email: '',
  name: '',
});
