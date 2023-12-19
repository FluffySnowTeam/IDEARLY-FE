// Monaco + Y.js + cursor 표시
import React, { useRef, useState, useEffect } from "react";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from "y-webrtc";
import "./cursor.css";

const ydocument = new Y.Doc();
const provider = new WebrtcProvider("monaco", ydocument);
const type = ydocument.getText("monaco2");

export default function MonacoY() {
  const editorRef = useRef(null);
  const [cursorPositions, setCursorPositions] = useState({});
  const awarenessRef = useRef(null);
  const [currentUserCursor, setCurrentUserCursor] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    awarenessRef.current = provider.awareness;

    // Monaco Editor의 커서 상태 변경 이벤트를 구독
    editorRef.current.onDidChangeCursorSelection(() => {
      const localCursor = editorRef.current.getPosition();
      setCurrentUserCursor(localCursor);
      awarenessRef.current.setLocalStateField("cursor", localCursor);
    });

    // Awareness의 상태 변경 이벤트를 구독하여 커서 위치 업데이트
    awarenessRef.current.on("change", () => {
      setCursorPositions({ ...awarenessRef.current.getStates() });
    });
  }, [editorRef.current]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Monaco Binding 설정
    const monacoBinding = new MonacoBinding(
      type,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );
  };

  const showValue = () => {
    alert(editorRef.current.getValue());
  };

  return (
    <>
      UOUO2
      <button onClick={showValue}>Show value</button>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={`a: 2\nb: a + 30`}
        onMount={handleEditorDidMount}
      />
      {Object.entries(cursorPositions).map(
        ([clientId, cursor]) =>
          clientId !== provider.awareness.clientID && (
            <div
              key={clientId}
              className="cursor"
              style={{
                left: `${cursor.column * 10}px`, // Adjust styling as needed
                top: `${cursor.lineNumber * 20}px`, // Adjust styling as needed
              }}
            ></div>
          )
      )}
      {currentUserCursor && (
        <div
          className="cursor"
          style={{
            left: `${currentUserCursor.column * 10}px`, // Adjust styling as needed
            top: `${currentUserCursor.lineNumber * 20}px`, // Adjust styling as needed
            background: "transparent", // Make it transparent or hide as needed
          }}
        ></div>
      )}
    </>
  );
}
