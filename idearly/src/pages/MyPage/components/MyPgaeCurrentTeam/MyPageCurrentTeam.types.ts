export interface ITeam {
  teamId: number;
  teamName: string;
  competitionId: number;
  competitionTitle: string;
  startDateTime: string;
  endDateTime: string;
  leaderName: string;
  leaderEmail: string;
}

export interface ICompetitionProp {
  competition: ITeam;
  onClickTeamDetail: (teamId: number) => void;
}

export interface IWaitingCompetitionProp {
  competition: ITeam;
}

export interface ITeamMember {
  name: string;
  email: string;
  inviteStatus?: string;
}

export interface IModifyTeamlModal {
  isOpen: boolean;
  onClose: () => void;
  currentMemberList: ITeamMember[];
  inviteMemberList: ITeamMember[];
  setCurrentMemberList: React.Dispatch<React.SetStateAction<ITeamMember[]>>;
  setInviteMemberList: React.Dispatch<React.SetStateAction<ITeamMember[]>>;
  teamId: number;
  competitionId: string;
}

export interface IDetailTeamlModal {
  isOpen: boolean;
  onClose: () => void;
  currentMemberList: ITeamMember[];
  inviteMemberList: ITeamMember[];
}

export interface ITeamModal {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: ITeamMember[];
}
