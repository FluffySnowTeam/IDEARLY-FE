import { CompetitionRequest } from "../types";

export const AdminNavConfig = {
  user: "회원 정보 관리",
  competition: "대회 정보 관리 ",
};

export const AdminUserPageConfig = {
  id: "유저 ID",
  name: "참가자 이름",
  email: "이메일",
  competition: "참가 대회",
  team: "참가 팀",
};

export const AdminCompePageConfig = {
  id: "대회 ID",
  name: "대회 이름",
  date: "대회 기간",
  edit: "문제 수정",
};

export const CompetitionInfoFormConfig: Array<{
  name: keyof CompetitionRequest;
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    name: "title",
    label: "대회 이름",
    type: "input",
    placeholder: "대회 이름을 작성해주세요",
  },
  {
    name: "startDateTime",
    label: "대회 시작일시",
    type: "input",
    placeholder: '"20231212/0900" 형태로 작성해주세요.',
  },
  {
    name: "endDateTime",
    label: "대회 종료일시",
    type: "input",
    placeholder: '"20231212/0900" 형태로 작성해주세요.',
  },
  {
    name: "description",
    label: "대회 내용",
    type: "textarea",
    placeholder: "대회 내용을 작성해주세요",
  },
];
