import { useData } from '../../context';
import { TabProps, TabState } from '../props';
import LabelInput from '../widgets/label/LabelInput';
import { CodeEditor } from '../widgets';
import Checkbox from '../widgets/checkbox/Checkbox';

const SECURITY_SYSTEM = 'system';

export function useCodeTab(): TabProps {
  return { name: 'Code', state: TabState.CONFIGURED, content: <CodeTab /> };
}

const CodeTab = () => {
  const [, code, setCode] = useData('config/output/code');
  const [, security, setSecurity] = useData('config/security');

  return (
    <>
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor code={code} onChange={code => setCode(code ?? '')} location='output.code' resizable={true} />
      </LabelInput>
      <Checkbox
        label='Disable Permission Checks (Execute this Script Step as SYSTEM)'
        value={security === SECURITY_SYSTEM}
        onChange={change => setSecurity(change ? SECURITY_SYSTEM : '')}
      />
    </>
  );
};
