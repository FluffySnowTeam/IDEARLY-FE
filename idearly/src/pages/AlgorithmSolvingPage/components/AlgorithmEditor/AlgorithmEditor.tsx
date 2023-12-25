import { useEffect, useRef } from "react";
import yorkie, { OperationInfo } from "yorkie-js-sdk";
import { basicSetup, EditorView } from "codemirror";
import { python } from "@codemirror/lang-python";
import { Transaction } from "@codemirror/state";
import "./style.css";
// import { yorkie_key } from "./yorkie_api.json";
import { YorkieDoc } from "./types";

export const AlgorithmEditor = () => {
  const editorParentRef = useRef<HTMLDivElement>(null);
  console.log('환경변수: ', import.meta.env.VITE_REACT_APP_YORKIE_API_KEY);
  useEffect(() => {
    const initYorkie = async () => {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = new yorkie.Client("https://api.yorkie.dev", {
        // apiKey: yorkie_key,
        apiKey: import.meta.env.VITE_REACT_APP_YORKIE_API_KEY,
      });
      await client.activate();

      // 02-1. create a document then attach it into the client.

      // 문제마다 다른 에디터 띄우는 건 이 부분에서 구현하면 될 것 같습니다!! 이 부분이 에디터 만드는 부분입니다.
      // teamId로 구성! -> teamId는 어떻게 넘어오지?
      const doc = new yorkie.Document<YorkieDoc>('editor');
      await client.attach(doc);

      doc.update((root) => {
        if (!root.content) {
          root.content = new yorkie.Text();
        }
      }, "create content if not exists");

      // 02-2. subscribe document event.
      const syncText = () => {
        const text = doc.getRoot().content;
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: text.toString(),
          },
          annotations: [Transaction.remote.of(true)],
        });
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

        view.dispatch({
          changes,
          annotations: [Transaction.remote.of(true)],
        });
      }

      syncText();
    };

    initYorkie();
  }, []);

  return (
    <>
      <div ref={editorParentRef} />
    </>
  );
};
