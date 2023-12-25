import { atomWithStorage } from "jotai/utils";

export const userInfoAtom = atomWithStorage("userInfo", {
  memberId: '',
  email: '',
  name: '',
  isLogin: false,
});