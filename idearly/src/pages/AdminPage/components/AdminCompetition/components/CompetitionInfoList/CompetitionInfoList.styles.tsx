import type { ICompetition } from "../../../../../../types";

export interface ICompetitionInfoList {
  competition: ICompetition;
  onTestcodeOpen: () => void;
  onProblemlOpen: () => void;
}
