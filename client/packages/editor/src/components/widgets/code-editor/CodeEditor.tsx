import './CodeEditor.css';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { useEditorContext } from '../../../context';
import { MINIMAL_STYLE } from '../../../monaco-editor-util';

function useResizeHeight(elRef: React.MutableRefObject<null>, initHeight: number) {
  const [height, setHeight] = useState(initHeight);

  const observer = useRef(
    new ResizeObserver(entries => {
      setHeight(entries[0].contentRect.height);
    })
  );

  useEffect(() => {
    const current = observer.current;
    const element = elRef.current;
    if (element) {
      current.observe(element);
    }
    return () => {
      if (element) {
        current.unobserve(element);
      }
    };
  }, [elRef, observer]);

  return height;
}

const CodeEditor = (props: {
  code: string;
  onChange: (code?: string) => void;
  location?: string;
  resizable?: boolean;
  initHeight?: number;
}) => {
  const editorContext = useEditorContext();
  const resizeDiv = useRef(null);
  const height = useResizeHeight(resizeDiv, props.initHeight ?? 90);

  const monacoOptions = MINIMAL_STYLE;
  monacoOptions.readOnly = editorContext.readonly;

  return (
    <div
      ref={resizeDiv}
      onResize={e => console.log(e)}
      className='resizable-editor'
      style={{
        height: `${props.initHeight ?? 90}px`,
        resize: props.resizable ? 'vertical' : 'none'
      }}
    >
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
    </div>
  );
};

export default CodeEditor;
