import { atom } from "jotai";
import { IExecuteTest, ITestResult } from "../types/algorithm.types";

export const testResultAtom = atom<ITestResult[]>([]);
export const executeResultAtom = atom<IExecuteTest[]>([]);