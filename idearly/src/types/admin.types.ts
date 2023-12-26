export type ITestCaseRequest = {
  input: string;
  answer: string;
  hidden: boolean;
};

export type ICompetitionResponse = {
  competitionId: number;
  endDateTime: string;
  startDateTime: string;
  title: string;
};
