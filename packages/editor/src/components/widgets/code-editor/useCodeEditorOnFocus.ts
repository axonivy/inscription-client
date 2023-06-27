import { useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { CodeEditorProps } from './CodeEditor';

export const useCodeEditorOnFocus = ({ value, onChange, id }: CodeEditorProps) => {
  const [active, setActive] = useState(false);
  const inputProps = { value, onChange, onFocus: () => setActive(true), id };
  return { active: active, nonFocusProps: inputProps, onBlur: () => setActive(false) };
};

export const monacoAutoFocus = (editor: monaco.editor.IStandaloneCodeEditor) => {
  var range = editor.getModel()?.getFullModelRange();
  if (range) {
    editor.setPosition(range.getEndPosition());
  }
  editor.focus();
};
