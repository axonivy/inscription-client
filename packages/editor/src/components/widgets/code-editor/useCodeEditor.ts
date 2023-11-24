import { useState } from 'react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import type { BrowserType } from '../../../components/browser/index.js';

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const range = editor.getModel()?.getFullModelRange();
  if (range) {
    editor.setPosition(range.getEndPosition());
  }
  editor.focus();
};

export type ModifyAction = (value: string) => string;

export const useModifyEditor = (options?: { modifyAction?: ModifyAction; scriptAreaDatatypeEditor?: boolean }) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor>();
  const modifyEditor = (value: string, type: BrowserType) => {
    if (!editor) {
      console.log('No editor set to modify');
      return;
    }
    const selection = editor.getSelection();
    if (!selection) {
      console.log('No selection found on editor');
      return;
    }

    if (type === 'type' && options?.scriptAreaDatatypeEditor) {
      const textWithLineBreak = 'import ' + value + ';\n';
      const parts = value.split('.');
      const shortValue = parts.length > 1 ? parts.pop() : value;
      editor.executeEdits('browser', [
        { range: editor.getModel()?.getFullModelRange().collapseToStart() ?? selection, text: textWithLineBreak, forceMoveMarkers: true },
        {
          range: selection,
          text: shortValue || '',
          forceMoveMarkers: true
        }
      ]);
    } else {
      const text = value.length > 0 && options?.modifyAction ? options.modifyAction(value) : value;
      editor.executeEdits('browser', [{ range: selection, text, forceMoveMarkers: true }]);
    }
  };

  return { setEditor, modifyEditor };
};
