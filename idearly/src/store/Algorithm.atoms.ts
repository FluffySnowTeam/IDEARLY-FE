import { atom } from "jotai";
import { ItestResult } from "../types/algorithm.types";

export const testResultAtom = atom<ItestResult[]>([]);