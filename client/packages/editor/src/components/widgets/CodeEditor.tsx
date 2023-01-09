import Editor from '@monaco-editor/react';
import { useEditorContext } from '../../context';
import { MINIMAL_STYLE } from '../../monaco-editor-util';

const CodeEditor = (props: { code: string; onChange: (code?: string) => void; location?: string }) => {
  const editorContext = useEditorContext();

  const monacoOptions = MINIMAL_STYLE;
  monacoOptions.readOnly = editorContext.readonly;

  return (
    <Editor
      className='input'
      defaultValue={props.code}
      value={props.code}
      defaultLanguage='ivyScript'
      height='90px'
      defaultPath={`ivyScript/${editorContext.pid}?location=${props.location ?? ''}`}
      options={monacoOptions}
      theme='axon-input'
      onChange={props.onChange}
    />
  );
};

export default CodeEditor;
