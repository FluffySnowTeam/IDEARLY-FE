import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const LoginStateAtom = atomWithStorage("isLogin", false);

export const EmailCheckAtom = atom<boolean>(false);
