import Editor from '@monaco-editor/react';
import { useReadonly } from '../../context';
import { MINIMAL_STYLE } from '../../monaco-editor-util';

const CodeEditor = (props: { code: string; onChange: (code?: string) => void }) => {
  const monacoOptions = MINIMAL_STYLE;
  monacoOptions.readOnly = useReadonly();

  return (
    <Editor
      className='input'
      defaultValue={props.code}
      value={props.code}
      defaultLanguage='form'
      height='90px'
      defaultPath='root.form'
      options={monacoOptions}
      theme='axon-input'
      onChange={props.onChange}
    />
  );
};

export default CodeEditor;
