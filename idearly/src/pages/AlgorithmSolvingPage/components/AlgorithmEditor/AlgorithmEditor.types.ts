import { type Text } from "yorkie-js-sdk";

export interface EditorProps {
  language: string;
  isinit: boolean;
}

export type YorkieDoc = {
  content: Text;
};
