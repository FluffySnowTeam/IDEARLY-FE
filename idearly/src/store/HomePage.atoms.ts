import { atom } from "jotai";
import type { ICompetition } from "../types";

const defaultCompetition = {
  competitionId: 0,
  title: "",
  startDateTime: "",
  endDateTime: "",
  description: "",
  login: false,
  participate: false,
  teamId: 0,
  teamName: "",
};

export const competitionDataAtom = atom<ICompetition>(defaultCompetition);
