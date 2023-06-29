import { useCallback } from 'react';
import { SINGLE_LINE_MONACO_OPTIONS } from '../../../monaco/monaco-editor-util';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import CodeEditor, { CodeEditorProps } from './CodeEditor';
import { monacoAutoFocus } from './useCodeEditorOnFocus';

export type CodeEditorInputProps = Omit<CodeEditorProps, 'macro' | 'options' | 'onMount' | 'height'>;

const SingleLineCodeEditor = ({ onChange, ...props }: CodeEditorProps) => {
  const handleEditorDidMount = useCallback<(editor: monaco.editor.IStandaloneCodeEditor) => void>(editor => {
    monacoAutoFocus(editor);
    editor.createContextKey('singleLine', true);
    const STATE_OPEN = 3;
    editor.addCommand(
      monaco.KeyCode.Enter,
      () => {
        // trigger 'acceptSelectedSuggestion' if 'Enter' is pressed on autocomplete widget
        if ((editor as any)._contentWidgets['editor.widget.suggestWidget']?.widget._widget._state === STATE_OPEN) {
          editor.trigger(undefined, 'acceptSelectedSuggestion', undefined);
        }
      },
      'singleLine'
    );
    editor.addCommand(
      monaco.KeyCode.Tab,
      () => {
        // trigger 'acceptSelectedSuggestion' if 'Tab' is pressed on autocomplete widget
        if ((editor as any)._contentWidgets['editor.widget.suggestWidget']?.widget._widget._state === STATE_OPEN) {
          editor.trigger(undefined, 'acceptSelectedSuggestion', undefined);
        } else if (editor.hasTextFocus() && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      },
      'singleLine'
    );
  }, []);

  const onCodeChange = useCallback<(code: string) => void>(
    code => {
      code = code.replace(/[\n\r]/g, '');
      onChange(code);
    },
    [onChange]
  );

  return <CodeEditor height={40} onChange={onCodeChange} options={SINGLE_LINE_MONACO_OPTIONS} onMount={handleEditorDidMount} {...props} />;
};

export default SingleLineCodeEditor;
