import { type Text } from "yorkie-js-sdk";

export interface EditorProps {
  language: string;
  isinit: boolean;
}

export type YorkieDoc = {
  content: Text;
};

export interface IAlgorithmEditor {
  competitionId: string | undefined;
  problemId: string | null;
  teamId: string | null;
}
