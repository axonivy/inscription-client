import './CodeEditor.css';
import Editor from '@monaco-editor/react';
import { useCallback, useState } from 'react';
import { useEditorContext } from '../../../context';
import { MONACO_OPTIONS, MonacoEditorUtil, SINGLE_LINE_MONACO_OPTIONS } from '../../../monaco/monaco-editor-util';
import { useMove } from 'react-aria';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const CodeEditor = (props: {
  code: string;
  onChange: (code: string) => void;
  location?: string;
  initFocus?: boolean;
  resizable?: boolean;
  initHeight?: number;
  singleLine?: boolean;
}) => {
  const editorContext = useEditorContext();
  const [resizeActive, setResizeActive] = useState(false);
  const [height, setHeight] = useState(props.initHeight ?? props.singleLine ? 30 : 90);
  const { moveProps } = useMove({
    onMoveStart(e) {
      setResizeActive(true);
    },
    onMove(e) {
      setHeight(y => y + e.deltaY);
    },
    onMoveEnd(e) {
      setResizeActive(false);
    }
  });

  const handleEditorDidMount = useCallback<(editor: monaco.editor.IStandaloneCodeEditor) => void>(
    editor => {
      if (props.initFocus) {
        var range = editor.getModel()?.getFullModelRange();
        if (range) {
          editor.setPosition(range.getEndPosition());
        }
        editor.focus();
      }
      editor.createContextKey('singleLine', props.singleLine);
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
    },
    [props]
  );
  const onCodeChange = useCallback<(code: string) => void>(
    code => {
      if (props.singleLine) {
        code = code.replace(/[\n\r]/g, '');
      }
      props.onChange(code);
    },
    [props]
  );

  let monacoOptions = MONACO_OPTIONS;
  if (props.singleLine) {
    monacoOptions = SINGLE_LINE_MONACO_OPTIONS;
  }
  monacoOptions.readOnly = editorContext.readonly;

  return (
    <div className='code-editor'>
      <Editor
        className='input'
        defaultValue={props.code}
        value={props.code}
        defaultLanguage='ivyScript'
        height={`${height}px`}
        defaultPath={`ivyScript/${editorContext.pid}?location=${props.location ?? ''}`}
        options={monacoOptions}
        theme={MonacoEditorUtil.DEFAULT_THEME_NAME}
        onChange={code => onCodeChange(code ?? '')}
        onMount={handleEditorDidMount}
      />
      {props.resizable && <hr className='resize-line' data-resize-active={resizeActive} {...moveProps} style={{ top: height }} />}
    </div>
  );
};

export default CodeEditor;
