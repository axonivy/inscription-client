import { useCallback } from 'react';
import { SINGLE_LINE_MONACO_OPTIONS } from '../../../monaco/monaco-editor-util';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import CodeEditor, { CodeEditorProps } from './CodeEditor';
import { monacoAutoFocus } from './useCodeEditor';

type EditorOptions = {
  editorOptions?: {
    fixedOverflowWidgets?: boolean;
  };
  keyActions?: {
    enter?: () => void;
    tab?: () => void;
    escape?: () => void;
  };
  modifyAction?: (value: string) => string;
};

export type CodeEditorInputProps = Omit<CodeEditorProps, 'macro' | 'options' | 'onMount' | 'height' | 'onMountFuncs' | 'context'> &
  EditorOptions;

const SingleLineCodeEditor = ({ onChange, onMountFuncs, editorOptions, keyActions, ...props }: CodeEditorProps & EditorOptions) => {
  const mountFuncs = onMountFuncs ? onMountFuncs : [];
  const singleLineMountFuncs = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editor.createContextKey('singleLine', true);
    const isSuggestWidgetOpen = (editor: monaco.editor.IStandaloneCodeEditor) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor as any)._contentWidgets['editor.widget.suggestWidget']?.widget._widget._state === STATE_OPEN;
    const triggerAcceptSuggestion = (editor: monaco.editor.IStandaloneCodeEditor) =>
      editor.trigger(undefined, 'acceptSelectedSuggestion', undefined);
    const STATE_OPEN = 3;
    editor.addCommand(
      monaco.KeyCode.Enter,
      () => {
        if (isSuggestWidgetOpen(editor)) {
          triggerAcceptSuggestion(editor);
        } else if (keyActions?.enter) {
          keyActions.enter();
        }
      },
      'singleLine'
    );
    editor.addCommand(
      monaco.KeyCode.Tab,
      () => {
        if (isSuggestWidgetOpen(editor)) {
          triggerAcceptSuggestion(editor);
        } else {
          if (editor.hasTextFocus() && document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          if (keyActions?.tab) {
            keyActions.tab();
          }
        }
      },
      'singleLine'
    );
    editor.addCommand(
      monaco.KeyCode.Escape,
      () => {
        if (!isSuggestWidgetOpen(editor) && keyActions?.escape) {
          keyActions.escape();
        }
      },
      'singleLine'
    );
  };

  const onCodeChange = useCallback<(code: string) => void>(
    code => {
      code = code.replace(/[\n\r]/g, '');
      onChange(code);
    },
    [onChange]
  );

  return (
    <CodeEditor
      height={40}
      onChange={onCodeChange}
      options={editorOptions ? { ...SINGLE_LINE_MONACO_OPTIONS, ...editorOptions } : SINGLE_LINE_MONACO_OPTIONS}
      onMountFuncs={[...mountFuncs, monacoAutoFocus, singleLineMountFuncs]}
      {...props}
    />
  );
};

export default SingleLineCodeEditor;
