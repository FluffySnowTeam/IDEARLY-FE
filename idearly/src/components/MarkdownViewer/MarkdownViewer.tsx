import { Viewer } from "@toast-ui/react-editor";

interface IMarkdownViewer {
  contents: string;
}

export const MarkdownViewer = ({ contents }: IMarkdownViewer) => {
  return <Viewer initialValue={contents || ""} />;
};
