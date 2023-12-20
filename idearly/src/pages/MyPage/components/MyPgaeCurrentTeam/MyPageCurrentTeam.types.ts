export interface ICompetition {
  teamId: number,
  teamName: string,
  competitionId: number,
  competitionTitle: string,
  startDateTime: string,
  endDateTime: string,
  leaderName: string,
  leaderEmail: string
}

export interface ICompetitionProp {
  competition: ICompetition;
}