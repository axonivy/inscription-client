import { useState } from 'react';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type { BrowserType } from '../../../components/browser';

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

  const modifyEditor = (value: string, type: BrowserType) => {
    if (!editor) {
      return;
    }
    const selection = editor.getSelection();
    if (!selection) {
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
      if (type === 'func') {
        const updatedEditorContent = editor.getValue();
        const editorModel = editor.getModel();

        if (editorModel && text.indexOf('(') !== -1) {
          const textIndex = updatedEditorContent.indexOf(text);

          const textrange = {
            startLineNumber: editorModel.getPositionAt(textIndex).lineNumber,
            startColumn: editorModel.getPositionAt(textIndex + 1 + text.indexOf('(')).column,
            endLineNumber: editorModel.getPositionAt(textIndex + text.length).lineNumber,
            endColumn: editorModel.getPositionAt(textIndex + text.length - 1).column
          };

          setTimeout(() => {
            editor.setSelection(textrange);
            editor.focus();
          }, 500);
        }
      }
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
