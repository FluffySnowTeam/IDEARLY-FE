import { ICompetition } from "../pages/MyPage/components/MyPgaeCurrentTeam/MyPageCurrentTeam.types";

export const curCompetition: ICompetition[] = [
  {
    teamId: 123,
    teamName: "snow",
    competitionId: 1,
    competitionTitle: "대회1",
    startDateTime: "2023-12-07T13:33:03.969Z",
    endDateTime: "2023-12-08T13:33:03.969Z",
    leaderName: "이름1",
    leaderEmail: "aaa@naver.com"
  },
  {
    teamId: 456,
    teamName: "fluffy",
    competitionId: 2,
    competitionTitle: "대회2",
    startDateTime: "2023-12-07T13:33:03.969Z",
    endDateTime: "2023-12-08T13:33:03.969Z",
    leaderName: "이름1",
    leaderEmail: "aaa@naver.com"
  }
]

export const TeamMembers = {
  teamId: 123,
  teamName: "snow",
  competitionId: 1,
  competitionName: "알고리즘 대회 이름",
  leaderName: "이름1",
  leaderEmail: "aaa@naver.com",
  teammates: [
    {
      name: "이름1",
      email: "aaa@naver.com",
      inviteStatus: "accept"
    },
    {
      name: "이름2",
      email: "bbb@naver.com",
      inviteStatus: "accept"
    },
    {
      name: "이름3",
      email: "ccc@naver.com",
      inviteStatus: "invite"
    }
  ]
}