import type { CodeEditorProps, /*EditorOptions,*/ ResizableCodeEditorProps } from '@axonivy/codemirror';
import type { BrowserType } from '../../browser';

export type MaximizedCodeEditorState = {
  maximizeState?: {
    isMaximizedCodeEditorOpen: boolean;
    setIsMaximizedCodeEditorOpen: (open: boolean) => void;
  };
};

export type CodeEditorAreaProps = Omit<ResizableCodeEditorProps, 'language' | 'options' | 'contextPath'> &
  MaximizedCodeEditorState & {
    browsers: BrowserType[];
  };

export type CodeEditorInputProps = Omit<
  CodeEditorProps,
  'language' | 'options' | 'height' | 'onMountFuncs' | 'contextPath'
> & /*EditorOptions &*/ { browsers: BrowserType[]; placeholder?: string };
