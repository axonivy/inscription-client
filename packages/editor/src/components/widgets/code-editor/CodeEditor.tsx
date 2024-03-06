import './CodeEditor.css';
import { useEditorContext } from '../../../context';
import { MONACO_OPTIONS, MonacoEditorUtil } from '../../../monaco/monaco-editor-util';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useRef, Suspense, lazy } from 'react';

const Editor = lazy(async () => {
  console.time('CodeEditor.Editor');
  const editor = await import('@monaco-editor/react');
  await MonacoEditorUtil.getInstance();
  console.timeEnd('CodeEditor.Editor');
  return editor;
});

export type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  context: { location: string; type?: string };
  macro?: boolean;
  height?: number;
  onMountFuncs?: Array<(editor: monaco.editor.IStandaloneCodeEditor) => void>;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
};

const CodeEditor = ({ value, onChange, context, macro, onMountFuncs, options, ...props }: CodeEditorProps) => {
  const { elementContext, readonly } = useEditorContext();
  const placeholderElement = useRef<HTMLDivElement>(null);
  const handlePlaceholder = (showPlaceholder: boolean) => {
    if (placeholderElement.current) {
      if (showPlaceholder) {
        placeholderElement!.current.style.display = 'block';
      } else {
        placeholderElement!.current.style.display = 'none';
      }
    }
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    onMountFuncs?.forEach(func => func(editor));
    handlePlaceholder(editor.getValue() === '');
  };

  const monacoOptions = options ?? MONACO_OPTIONS;
  monacoOptions.readOnly = readonly;
  const language = macro ? 'ivyMacro' : 'ivyScript';

  const contextPath = `${elementContext.app}/${elementContext.pmv}/${elementContext.pid}`;

  return (
    <div className='code-editor'>
      <Suspense fallback={<div className='code-input'>Loading Editor...</div>}>
        <Editor
          className='code-input'
          defaultValue={value}
          value={value}
          defaultLanguage={language}
          defaultPath={`${language}/${contextPath}/${context.location}/${context.type ? context.type : ''}`}
          options={monacoOptions}
          theme={MonacoEditorUtil.DEFAULT_THEME_NAME}
          onChange={code => {
            handlePlaceholder(!code);
            onChange(code ?? '');
          }}
          onMount={handleEditorDidMount}
          {...props}
        />
      </Suspense>

      <div ref={placeholderElement} className={`monaco-placeholder ${monacoOptions.lineNumbers === 'on' ? 'with-lineNumbers' : ''}`}>
        Press CTRL + SPACE for auto-completion
      </div>
    </div>
  );
};

export default CodeEditor;
