import { atom } from "jotai";
import { ITeam } from "../pages/MyPage/components/MyPgaeCurrentTeam/MyPageCurrentTeam.types";

export const curTeamAtom = atom<ITeam[]>([]);

export const waitTeamAtom = atom<ITeam[]>([]);