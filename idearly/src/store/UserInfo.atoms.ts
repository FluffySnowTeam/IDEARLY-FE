import { atomWithStorage } from "jotai/utils";

export const userInfoAtom = atomWithStorage("userInfo", {
  authority: "",
  memberId: "",
  email: "",
  name: "",
  isLogin: false,
});
