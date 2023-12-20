export interface ICompetition {
  competitionId: string;
  title: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
  login: boolean;
  participate: boolean;
  teamId: number;
  teamName: string;
}

export interface ICompetitionInfoList {
  competition: ICompetition;
  onOpen: () => void;
}
