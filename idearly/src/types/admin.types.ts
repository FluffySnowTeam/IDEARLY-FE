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

export type IUserListResponse = {
  competitionIdList: number;
  competitionTitleList: string[];
  email: string;
  memberId: number;
  name: string;
  teamIdList: number[];
  teamNameList: string[];
};
