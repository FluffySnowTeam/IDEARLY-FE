import type { ICompetitionResponse } from "../../../../../../types/admin.types";

export interface ICompetitionInfoList {
  competition: ICompetitionResponse;
  onTestcodeOpen: () => void;
  onProblemlOpen: () => void;
}
