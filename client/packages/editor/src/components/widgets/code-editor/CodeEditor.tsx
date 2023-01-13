import './CodeEditor.css';
import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { useEditorContext } from '../../../context';
import { MINIMAL_STYLE } from '../../../monaco-editor-util';
import { useMove } from 'react-aria';

const CodeEditor = (props: {
  code: string;
  onChange: (code?: string) => void;
  location?: string;
  resizable?: boolean;
  initHeight?: number;
}) => {
  const editorContext = useEditorContext();
  const [resizeActive, setResizeActive] = useState(false);
  const [height, setHeight] = useState(props.initHeight ?? 90);
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

  const monacoOptions = MINIMAL_STYLE;
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
        theme='axon-input'
        onChange={props.onChange}
      />
      {props.resizable && <hr className='resize-line' data-resize-active={resizeActive} {...moveProps} style={{ top: height }} />}
    </div>
  );
};

export default CodeEditor;
