import { useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useFocusWithin } from 'react-aria';

export const useCodeEditorOnFocus = () => {
  const [isFocusWithin, setFocusWithin] = useState(false);
  let { focusWithinProps } = useFocusWithin({ onFocusWithinChange: isFocusWithin => setFocusWithin(isFocusWithin) });
  return { isFocusWithin, focusWithinProps };
};

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  var range = editor.getModel()?.getFullModelRange();
  if (range) {
    editor.setPosition(range.getEndPosition());
  }
  editor.focus();
};

export const useModifyEditor = () => {
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
    editor.executeEdits('browser', [{ range: selection, text: value, forceMoveMarkers: true }]);
  };
  return { setEditor, modifyEditor };
};
