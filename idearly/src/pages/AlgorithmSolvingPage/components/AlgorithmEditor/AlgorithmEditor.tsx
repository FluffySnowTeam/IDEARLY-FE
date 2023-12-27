// algorithmEditor.tsx
import { useEffect, useRef, useState } from "react";
import yorkie, { Client, OperationInfo } from "yorkie-js-sdk";
import { basicSetup, EditorView } from "codemirror";
import { python } from "@codemirror/lang-python";
import { Transaction } from "@codemirror/state";
// import { yorkie_key } from "./yorkie_api.json";
import { YorkieDoc } from "./AlgorithmEditor.types";
import { AlgorithmFooter } from "..";
import * as S from "./AlgorithmEditor.styles";
import { useExcuteTestMutation, useRunMutation } from "../../../../hooks";
import { AlgorithmSubmitResult, AlgorithmTestResult } from "../AlgorithmResult";
import { algorithmProblemsAtom } from "../../../../store/Algorithm.atoms";
import { useAtomValue } from "jotai";

interface Prop {
  competitionId: string | undefined;
  problemId: string | null;
  teamId: string | null;
}

export const AlgorithmEditor = ({ competitionId, problemId, teamId }: Prop) => {
  let client: Client | null;
  const [resultState, setResultState] = useState<string>("none");
  const editorParentRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | undefined>();
  const docRef = useRef<typeof yorkie.Document | undefined>();
  const problemData = useAtomValue(algorithmProblemsAtom);

  const { mutate: executeMutate } = useExcuteTestMutation();
  const { mutate: runMutate } = useRunMutation();

  const handleExcute = () => {
    const code = viewRef.current?.state.doc.toString();
    executeMutate({ competitionId, problemId, code });
    setResultState("test");
  };

  const handleSubmit = () => {
    const code = viewRef.current?.state.doc.toString();
    runMutate({ competitionId, problemId, code });
    setResultState("submit");
  };

  useEffect(() => {
    const disactivateClient = async () => {
      if (client) {
        await client.deactivate();
      }
    };

    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = undefined;
    }

    let doc = new yorkie.Document<YorkieDoc>(`${teamId}___${problemId}`);

    disactivateClient();
    initYorkie(doc);
  }, [problemId]);

  const initYorkie = async (doc: any) => {
    // 01. create client with RPCAddr(envoy) then activate it.
    client = new yorkie.Client("https://api.yorkie.dev", {
      apiKey: import.meta.env.VITE_APP_YORKIE_API_KEY,
    });
    await client.activate();

    // 02-1. create a document then attach it into the client.
    await client.attach(doc);

    doc.update((root: any) => {
      if (!root.content) {
        // root.content = new yorkie.Text();
        // 하나하나 돌면서 값을 넣어준다.
        let newContent = problemData.code;
        newContent.split("").map((code, index) => {
          doc.update((root: any) => {
            root.content.edit(index, index + 1, code);
          }, `update content byA ${client!.getID()}`);
        });
      }
      (
        fromA: any,
        toA: any,
        _: any,
        __: any,
        inserted: { toJSON: () => any[] }
      ) => {
        doc.update((root: any) => {
          root.content.edit(fromA, toA, inserted.toJSON().join("\n"));
        }, `update content byA ${client!.getID()}`);
      };
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

    doc.subscribe((event: any) => {
      if (event.type === "snapshot") {
        // The text is replaced to snapshot and must be re-synced.
        syncText();
      }
    });

    doc.subscribe("$.content", (event: any) => {
      if (event.type === "remote-change") {
        const { operations } = event.value;
        handleOperations(operations);
      }
    });
    await client.sync();

    // 03-1. define function that bind the document with the codemirror(broadcast local changes to peers)
    const updateListener = EditorView.updateListener.of((viewUpdate: any) => {
      if (viewUpdate.docChanged) {
        for (const tr of viewUpdate.transactions) {
          const events = ["select", "input", "delete", "move", "undo", "redo"];
          if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
            continue;
          }
          if (tr.annotation(Transaction.remote)) {
            continue;
          }
          tr.changes.iterChanges(
            (
              fromA: any,
              toA: any,
              _: any,
              __: any,
              inserted: { toJSON: () => any[] }
            ) => {
              doc.update((root: any) => {
                root.content.edit(fromA, toA, inserted.toJSON().join("\n"));
              }, `update content byA ${client!.getID()}`);
            }
          );
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
    docRef.current = doc;

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

  const handleInitButton = async () => {
    // @ts-ignore
    docRef.current.update((root: any) => {
      // root.content.edit(0, root.content.length, "");
      root.content.edit(0, root.content.length, "");
    }, "init content");

    if (viewRef.current) {
      // 1. 에디터의 내용 초기화
      const doc = viewRef.current.state.doc;
      const changes = [{ from: 0, to: doc.length, insert: "" }];

      viewRef.current.dispatch({
        changes,
        annotations: [Transaction.remote.of(true)],
      });
    }
    setResultState("none");
  };

  return (
    <>
      <S.CodeMirrorContainer ref={editorParentRef} />
      {resultState === "none" ? (
        <S.AlgorithmResultContainer></S.AlgorithmResultContainer>
      ) : resultState === "test" ? (
        <AlgorithmTestResult />
      ) : (
        <AlgorithmSubmitResult />
      )}
      <S.EditorButtonWrapper>
        <AlgorithmFooter
          handleInitButton={handleInitButton}
          handleExcute={handleExcute}
          handleSubmit={handleSubmit}
        />
      </S.EditorButtonWrapper>
    </>
  );
};
