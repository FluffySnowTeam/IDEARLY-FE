import { atomWithStorage } from "jotai/utils";

export const LoginStateAtom = atomWithStorage("isLogin", false);
