import './CodeEditor.css';
import Editor from '@monaco-editor/react';
import { useEditorContext } from '../../../context';
import { MONACO_OPTIONS, MonacoEditorUtil } from '../../../monaco/monaco-editor-util';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  location: string;
  macro?: boolean;
  height?: number;
  onMountFuncs?: Array<(editor: monaco.editor.IStandaloneCodeEditor) => void>;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  id?: string;
};

const CodeEditor = ({ value, onChange, location, macro, onMountFuncs, options, id, ...props }: CodeEditorProps) => {
  const editorContext = useEditorContext();

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    onMountFuncs?.forEach(func => func(editor));
  };

  const monacoOptions = options ?? MONACO_OPTIONS;
  monacoOptions.readOnly = editorContext.readonly;
  const language = macro ? 'ivyMacro' : 'ivyScript';

  return (
    <div {...(id ? { id } : {})} className='code-editor'>
      <Editor
        className='code-input'
        defaultValue={value}
        value={value}
        defaultLanguage={language}
        defaultPath={`${language}/${editorContext.pid}?location=${location ?? ''}`}
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
