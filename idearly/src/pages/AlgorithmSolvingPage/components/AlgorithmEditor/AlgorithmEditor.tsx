// algorithmEditor.tsx
import { useEffect, useRef, useState } from "react";
import yorkie, { OperationInfo } from "yorkie-js-sdk";
import { basicSetup, EditorView } from "codemirror";
import { python } from "@codemirror/lang-python";
import { Transaction } from "@codemirror/state";
import "./style.css";
// import { yorkie_key } from "./yorkie_api.json";
import { YorkieDoc } from "./types";
import { AlgorithmFooter, AlgorithmResult } from "..";
import * as S from "./AlgorithmEditor.styles";
import { useExcuteTestMutation, useRunMutation } from "../../../../hooks";

interface Prop {
  competitionId: string | undefined,
  problemId: string | null,
}

export const AlgorithmEditor = ({competitionId, problemId}: Prop) => {
  const editorParentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | undefined>();

  const { mutate: executeMutate } = useExcuteTestMutation();
  const { mutate: runMutate } = useRunMutation();
  // const [code, setCode] = useState<string>('');
  const handleInitButton = () => {
    // setIsInit(!isInit);
    // console.log(isInit);
  };

  const handleExcute = () => {
    const code = viewRef.current?.state.doc.toString();
    executeMutate({competitionId, problemId, code});
  }

  const handleSubmit = () => {
    const code = viewRef.current?.state.doc.toString();
    runMutate({competitionId, problemId, code});
  }

  // code editor 관련
  useEffect(() => {
    const initYorkie = async () => {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = new yorkie.Client("https://api.yorkie.dev", {
        // apiKey: yorkie_key,
        apiKey: import.meta.env.VITE_REACT_APP_YORKIE_API_KEY,
      });
      await client.activate();

      // 02-1. create a document then attach it into the client.

      // teamId로 구성! -> teamId는 어떻게 넘어오지?
      const doc = new yorkie.Document<YorkieDoc>('teamId');
      await client.attach(doc);

      doc.update((root) => {
        if (!root.content) {
          root.content = new yorkie.Text();
        }
      }, "create content if not exists");

      // 02-2. subscribe document event.
      const syncText = () => {
        const text = doc.getRoot().content;
        if (viewRef.current) {
          viewRef.current.dispatch({
            changes: {
              from: 0,
              to: viewRef.current.state.doc.length,
              insert: text.toString(),
            },
            annotations: [Transaction.remote.of(true)],
          });
        }
      };

      doc.subscribe((event) => {
        if (event.type === "snapshot") {
          // The text is replaced to snapshot and must be re-synced.
          syncText();
        }
      });

      doc.subscribe("$.content", (event) => {
        if (event.type === "remote-change") {
          const { operations } = event.value;
          handleOperations(operations);
        }
      });

      await client.sync();

      // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
      const updateListener = EditorView.updateListener.of((viewUpdate) => {
        if (viewUpdate.docChanged) {
          for (const tr of viewUpdate.transactions) {
            const events = [
              "select",
              "input",
              "delete",
              "move",
              "undo",
              "redo",
            ];
            if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
              continue;
            }
            if (tr.annotation(Transaction.remote)) {
              continue;
            }
            tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
              doc.update((root) => {
                root.content.edit(fromA, toA, inserted.toJSON().join("\n"));
              }, `update content byA ${client.getID()}`);
            });
          }
        }
      });

      // 03-2. create codemirror instance
      const view = new EditorView({
        doc: "",
        extensions: [basicSetup, python(), updateListener],
        parent: editorParentRef.current || undefined,
      });

      viewRef.current = view;


      // 03-3. define event handler that apply remote changes to local
      function handleOperations(operations: Array<OperationInfo>) {
        operations.forEach((op) => {
          if (op.type === "edit") {
            handleEditOp(op);
          }
        });
      }

      function handleEditOp(op: any) {
        const changes = [
          {
            from: Math.max(0, op.from),
            to: Math.max(0, op.to),
            insert: op.value.content,
          },
        ];
        if (viewRef.current) {
          viewRef.current.dispatch({
            changes,
            annotations: [Transaction.remote.of(true)],
          });
        }
      }
      syncText();
    };

    initYorkie();

  }, []);

  const getEditorValue = () => {
    const editorValue = viewRef.current?.state.doc.toString();
    console.log('에디터에 입력된 값:', editorValue);
    // 여기서 editorValue를 활용하여 필요한 작업을 수행할 수 있습니다.
  };

  return (
    <>
      <div ref={editorParentRef} />
      <AlgorithmResult />
      <S.EditorButtonWrapper>
        <AlgorithmFooter handleInitButton={handleInitButton} handleExcute={handleExcute} handleSubmit={handleSubmit} />
      </S.EditorButtonWrapper>
    </>
  );
};

