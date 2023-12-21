import { ICompetition } from "../../../../../../types";

export interface ICompetitionInfoList {
  competition: ICompetition;
  onOpen: () => void;
}
