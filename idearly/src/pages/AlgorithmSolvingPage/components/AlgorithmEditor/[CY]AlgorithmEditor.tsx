import React, { useEffect, useRef } from 'react';
import yorkie from 'yorkie-js-sdk';
import { basicSetup, EditorView } from 'codemirror';
import { keymap } from '@codemirror/view';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import { Transaction } from '@codemirror/state';
import './style.css';

const CodeMirrorComponent = () => {
  const editorParentRef = useRef();
  const docRef = useRef();
  const viewRef = useRef();

  useEffect(() => {
    console.log('useEffect is running');
    const initYorkie = async () => {
      // 01. create client with RPCAddr(envoy) then activate it.
      const client = new yorkie.Client('https://api.yorkie.dev', {
        apiKey: 'clskuqbj2k70uv115dv0',
      });
      await client.activate();

      // 02-1. create a document then attach it into the client.
      const doc = new yorkie.Document(
        `codemirror6-${new Date()
          .toISOString()
          .substring(0, 10)
          .replace(/-/g, '')}`
      );
      // const doc = new yorkie.Document('editor')
      await client.attach(doc);

      doc.update((root) => {
        if (!root.content) {
          root.content = new yorkie.Text();
        }
      }, 'create content if not exists');

      // 02-2. subscribe document event.
      const syncText = () => {
        const text = doc.getRoot().content;
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: text.toString(),
          },
          annotations: [Transaction.remote.of(true)],
        });
      };

      doc.subscribe((event) => {
        if (event.type === 'snapshot') {
          // The text is replaced to snapshot and must be re-synced.
          syncText();
        }
      });

      doc.subscribe('$.content', (event) => {
        if (event.type === 'remote-change') {
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
              'select',
              'input',
              'delete',
              'move',
              'undo',
              'redo',
            ];
            if (
              !events.map((event) => tr.isUserEvent(event)).some(Boolean)
            ) {
              continue;
            }
            if (tr.annotation(Transaction.remote)) {
              continue;
            }
            tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
              doc.update((root) => {
                root.content.edit(
                  fromA,
                  toA,
                  inserted.toJSON().join('\n')
                );
              }, `update content byA ${client.getID()}`);
            });
          }
        }
      });

      // 03-2. create codemirror instance
      const view = new EditorView({
        doc: '',
        extensions: [
          basicSetup,
          markdown({ base: markdownLanguage }),
          keymap.of(markdownKeymap),
          updateListener,
        ],
        parent: editorParentRef.current,
      });

      // Save references to state
      docRef.current = doc;
      viewRef.current = view;

      // 03-3. define event handler that apply remote changes to local
      function handleOperations(operations) {
        operations.forEach((op) => {
          if (op.type === 'edit') {
            handleEditOp(op);
          }
        });
      }

      function handleEditOp(op) {
        const changes = [
          {
            from: Math.max(0, op.from),
            to: Math.max(0, op.to),
            insert: op.value.content,
          },
        ];

        viewRef.current.dispatch({
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
      <div ref={editorParentRef} className="editor"/>
    </>
  )
};

export default CodeMirrorComponent;
