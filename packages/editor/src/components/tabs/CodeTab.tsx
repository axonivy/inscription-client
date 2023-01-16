import { useData } from '../../context';
import { TabProps, TabState } from '../props';
import { Checkbox, CodeEditor, LabelInput } from '../widgets';

export function useCodeTab(): TabProps {
  return { name: 'Code', state: TabState.CONFIGURED, content: <CodeTab /> };
}

const CodeTab = () => {
  const [, code, setCode] = useData('config/output/code');
  const [, sudo, setSudo] = useData('config/sudo');

  return (
    <>
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor code={code} onChange={code => setCode(code ?? '')} location='output.code' resizable={true} />
      </LabelInput>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={sudo} onChange={change => setSudo(change)} />
    </>
  );
};
