import { useData } from '../../context';
import { TabProps, TabState } from '../props';
import LabelInput from '../widgets/label/LabelInput';
import { CodeEditor } from '../widgets';

export function useCodeTab(): TabProps {
  return { name: 'Code', state: TabState.CONFIGURED, content: <CodeTab /> };
}

const CodeTab = () => {
  const [, code, setCode] = useData('config/output/code');

  return (
    <LabelInput label='Code' htmlFor='code'>
      <CodeEditor code={code} onChange={code => setCode(code ?? '')} location='output.code' />
    </LabelInput>
    // disable permission checkbox
  );
};
