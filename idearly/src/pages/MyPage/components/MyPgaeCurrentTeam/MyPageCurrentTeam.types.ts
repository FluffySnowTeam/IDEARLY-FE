export interface ITeam {
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
  competition: ITeam;
  onOpen?: () => void;
  onClickTeamDetail?: (teamId: number) => void;
}

export interface ITeamMember {
  name: string,
  email: string,
  inviteStatus?: string,
}

export interface ITeamlModal {
  isOpen: boolean;
  onClose: () => void;
  currentMemberList: ITeamMember[];
  inviteMemberList: ITeamMember[];
}
