import './ResizableCodeEditor.css';
import { useState } from 'react';
import { useMove } from 'react-aria';
import CodeEditor, { CodeEditorProps } from './CodeEditor';

export type CodeEditorAreaProps = Omit<ResizableCodeEditorProps, 'macro' | 'options' | 'onMount'>;

type ResizableCodeEditorProps = Omit<CodeEditorProps, 'height' | 'context'> & {
  location: string;
  initHeight?: number;
};

const ResizableCodeEditor = ({ initHeight, location, ...props }: ResizableCodeEditorProps) => {
  const [height, setHeight] = useState(initHeight ?? 90);
  const [resizeActive, setResizeActive] = useState(false);
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

  return (
    <div className='resizable-code-editor'>
      <CodeEditor {...props} context={{ location }} height={height} />
      <hr className='resize-line' data-resize-active={resizeActive} {...moveProps} style={{ top: height }} />
    </div>
  );
};

export default ResizableCodeEditor;
