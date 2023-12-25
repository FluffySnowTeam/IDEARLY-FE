export interface ICompetitionCard {
  competition: {
    competitionId: number;
    title: string;
    startDateTime: string;
    endDateTime: string;
    description: string;
    login: boolean;
    participate: boolean;
    teamId: number;
    teamName: string;
  };
}
