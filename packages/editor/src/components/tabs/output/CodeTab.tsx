import { InscriptionValidation } from '@axonivy/inscription-protocol';
import { useValidation } from '../../../context';
import { TabProps, useTabState } from '../../props';
import { Checkbox, CodeEditor, LabelInput } from '../../widgets';
import { useOutputData } from './useOutputData';

function useCodeTabValidation(): InscriptionValidation[] {
  const dialog = useValidation('config/output/code');
  return [dialog];
}

export function useCodeTab(): TabProps {
  const validation = useCodeTabValidation();
  const tabState = useTabState({}, {}, validation);
  return {
    name: 'Code',
    state: tabState,
    content: <CodeTab />
  };
}

const CodeTab = () => {
  const { data, updateCode, updateSudo } = useOutputData();

  return (
    <>
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor
          code={data.config.output?.code ?? ''}
          onChange={code => updateCode(code ?? '')}
          location='output.code'
          resizable={true}
        />
      </LabelInput>
      <Checkbox
        label='Disable Permission Checks (Execute this Script Step as SYSTEM)'
        value={data.config.sudo ?? false}
        onChange={updateSudo}
      />
    </>
  );
};
