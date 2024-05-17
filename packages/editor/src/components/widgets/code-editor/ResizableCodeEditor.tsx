import './ResizableCodeEditor.css';
import { useState } from 'react';
import { useMove } from 'react-aria';
import type { CodeEditorProps } from './CodeEditor';
import CodeEditor from './CodeEditor';
import type { BrowserType } from '../../../components/browser';

export type CodeEditorAreaProps = Omit<ResizableCodeEditorProps, 'macro' | 'options' | 'onMount' | 'location'> & {
  browsers: BrowserType[];
  maximizeState?: {
    isMaximizedCodeEditorOpen: boolean;
    setIsMaximizedCodeEditorOpen: (open: boolean) => void;
  };
};

type ResizableCodeEditorProps = Omit<CodeEditorProps, 'height' | 'context'> & {
  location: string;
  initHeight?: number;
};

const ResizableCodeEditor = ({ initHeight, location, ...props }: ResizableCodeEditorProps) => {
  const [height, setHeight] = useState(initHeight ?? 90);
  const [resizeActive, setResizeActive] = useState(false);
  const { moveProps } = useMove({
    onMoveStart() {
      setResizeActive(true);
    },
    onMove(e) {
      setHeight(y => y + e.deltaY);
    },
    onMoveEnd() {
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
