import { useEffect, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useFocusWithin } from 'react-aria';

export const useCodeEditorOnFocus = (initialValue: string, onChange: (change: string) => void) => {
  const [isFocusWithin, setFocusWithin] = useState(false);
  const [focusValue, setFocusValue] = useState(initialValue);
  useEffect(() => {
    setFocusValue(initialValue);
  }, [initialValue]);
  const { focusWithinProps } = useFocusWithin({ onFocusWithinChange: setFocusWithin, onBlurWithin: () => onChange(focusValue) });
  return { isFocusWithin, focusWithinProps, focusValue: { value: focusValue, onChange: setFocusValue } };
};

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  const range = editor.getModel()?.getFullModelRange();
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
