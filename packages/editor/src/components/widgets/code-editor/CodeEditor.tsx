import './CodeEditor.js';
import { Editor } from '@monaco-editor/react';
import { useEditorContext } from '../../../context/index.js';
import { MONACO_OPTIONS, MonacoEditorUtil } from '../../../monaco/monaco-editor-util.js';
import type * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

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

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    onMountFuncs?.forEach(func => func(editor));
  };

  const monacoOptions = options ?? MONACO_OPTIONS;
  monacoOptions.readOnly = readonly;
  const language = macro ? 'ivyMacro' : 'ivyScript';

  const contextPath = `${elementContext.app}/${elementContext.pmv}/${elementContext.pid}`;

  return (
    <div className='code-editor'>
      <Editor
        className='code-input'
        defaultValue={value}
        value={value}
        defaultLanguage={language}
        defaultPath={`${language}/${contextPath}/${context.location}/${context.type ? context.type : ''}`}
        options={monacoOptions}
        theme={MonacoEditorUtil.DEFAULT_THEME_NAME}
        onChange={code => onChange(code ?? '')}
        onMount={handleEditorDidMount}
        {...props}
      />
    </div>
  );
};

export default CodeEditor;
