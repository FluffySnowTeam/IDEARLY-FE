// monaco + y.js
import React, { useRef } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import Editor from "@monaco-editor/react";
import {WebrtcProvider} from "y-webrtc";

const ydocument = new Y.Doc();
const provider = new WebrtcProvider("monaco", ydocument);
const type = ydocument.getText("monaco");

export const AlgorithmEditor = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    console.log('editor:', editor);
    console.log('editor model:', editor.getModel());

    editorRef.current = editor;
    const monacoBinding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  }

  const showValue = () => {
    alert(editorRef.current.getValue());
  }
  // console.log(;

  return (
    <>
      UOUO2
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={`a: 2
b: a + 30`}
        onMount={handleEditorDidMount}
      />
    </>
  );
}
