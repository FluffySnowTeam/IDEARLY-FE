import { atom } from "jotai";
import type { IExecuteTest, ITestResult } from "../types/algorithm.types";
import type { IProblemsData } from "../pages/AlgorithmSolvingPage/components/AlgorithmProblem/AlgorithmProblem.types";

export const testResultAtom = atom<ITestResult[]>([]);
export const executeResultAtom = atom<IExecuteTest[]>([]);

const defaultProblemValue = {
  name: "",
  description: "",
  code: "",
};

export const algorithmProblemsAtom = atom<IProblemsData>(defaultProblemValue);
