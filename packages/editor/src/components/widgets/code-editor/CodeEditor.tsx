import './CodeEditor.css';
import Editor from '@monaco-editor/react';
import { useEditorContext } from '../../../context';
import { MONACO_OPTIONS, MonacoEditorUtil } from '../../../monaco/monaco-editor-util';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

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
  const editorContext = useEditorContext();

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    onMountFuncs?.forEach(func => func(editor));
  };

  const monacoOptions = options ?? MONACO_OPTIONS;
  monacoOptions.readOnly = editorContext.readonly;
  const language = macro ? 'ivyMacro' : 'ivyScript';

  const contextPath = `${editorContext.context.app}/${editorContext.context.pmv}/${editorContext.context.pid}`;

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
