import { useState } from 'react';
import { MINIMAL_STYLE } from '../../monaco-editor-util';
import { useReadonly } from '../../context';
import { TabProps, TabState } from '../props';
import LabelInput from '../widgets/label/LabelInput';
import { CodeEditor } from '../widgets';

export function useCodeTab(): TabProps {
  return { name: 'Code', state: TabState.CONFIGURED, content: <CodeTab /> };
}

const CodeTab = () => {
  const [code, setCode] = useState('');

  const monacoOptions = MINIMAL_STYLE;
  monacoOptions.readOnly = useReadonly();
  return (
    <LabelInput label='Code' htmlFor='code'>
      <CodeEditor code={code} onChange={code => setCode(code ?? '')} />
    </LabelInput>
    // disable permission checkbox
  );
};
