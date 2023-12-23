import * as S from "./AlgorithmEditor.styles";
import CodeMirrorComponent from "./[CY]AlgorithmEditor";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

export const AlgorithmEditor = () => {
  return (
    <S.AlgorithmEditorContainer>
      {/* <CodeMirror theme={githubLight} extensions={[python()]} height="64.9vh" /> */}
      <CodeMirrorComponent />
    </S.AlgorithmEditorContainer>
  );
};
