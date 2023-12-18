import { useState } from 'react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type { BrowserValue } from '../../browser/Browser';

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const range = editor.getModel()?.getFullModelRange();
  if (range) {
    editor.setPosition(range.getEndPosition());
  }
  editor.focus();
};

export type ModifyAction = (value: string) => string;

export const useMonacoEditor = (options?: { modifyAction?: ModifyAction; scriptAreaDatatypeEditor?: boolean }) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();

  const modifyEditor = (value: BrowserValue) => {
    if (!editor) {
      return;
    }
    const selection = editor.getSelection();
    if (!selection) {
      return;
    }
    if (value.firstLineValue) {
      editor.executeEdits('browser', [
        {
          range: editor.getModel()?.getFullModelRange().collapseToStart() ?? selection,
          text: value.firstLineValue ? value.firstLineValue : '',
          forceMoveMarkers: true
        },
        {
          range: selection,
          text: value.cursorValue,
          forceMoveMarkers: true
        }
      ]);
    } else {
      const text = value.cursorValue.length > 0 && options?.modifyAction ? options.modifyAction(value.cursorValue) : value.cursorValue;
      editor.executeEdits('browser', [{ range: selection, text, forceMoveMarkers: true }]);
    }
  };

  const getMonacoSelection: () => string = () => {
    const selection = editor?.getSelection();
    if (selection) {
      return editor?.getModel()?.getValueInRange(selection) || '';
    }
    return '';
  };

  return { setEditor, modifyEditor, getMonacoSelection };
};
