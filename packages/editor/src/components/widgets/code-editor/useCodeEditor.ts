import { useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const range = editor.getModel()?.getFullModelRange();
  if (range) {
    editor.setPosition(range.getEndPosition());
  }
  editor.focus();
};

export type ModifyAction = (value: string) => string;

export const useModifyEditor = (modifyAction?: ModifyAction) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const modifyEditor = (value: string) => {
    if (!editor) {
      console.log('No editor set to modify');
      return;
    }
    const selection = editor.getSelection();
    if (!selection) {
      console.log('No selection found on editor');
      return;
    }
    const text = value.length > 0 && modifyAction ? modifyAction(value) : value;
    editor.executeEdits('browser', [{ range: selection, text, forceMoveMarkers: true }]);
  };
  return { setEditor, modifyEditor };
};
