import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { useData, useValidation } from '../../context';
import { TabProps, useTabState } from '../props';
import { Checkbox, CodeEditor, LabelInput } from '../widgets';

function useCodeTabValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/output/code');
  return [dialog];
}

export function useCodeTab(): TabProps {
  const [initData, data] = useData('config/output/code');
  const validation = useCodeTabValidation();
  const tabState = useTabState(initData, data, validation);
  return {
    name: 'Code',
    state: tabState,
    content: <CodeTab />
  };
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
