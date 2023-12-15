export interface ICompetition {
  id: string;
  title: string;
  subTitle: string;
  date: string;
}

export interface ICompetitionInfoList {
  competition: ICompetition;
  onOpen: () => void;
}
