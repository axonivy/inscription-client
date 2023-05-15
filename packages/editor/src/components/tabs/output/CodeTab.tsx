import { TabProps, useTabState } from '../../props';
import { Checkbox, CodeEditor, Fieldset } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodeTab(): TabProps {
  const { outputData, defaultData } = useOutputData();
  const tabState = useTabState([defaultData.output.code, defaultData.sudo], [outputData.output.code, outputData.sudo], []);
  return { name: 'Code', state: tabState, content: <CodeTab /> };
}

const CodeTab = () => {
  const { outputData, updateCode, updateSudo } = useOutputData();

  return (
    <>
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={outputData.output.code} onChange={updateCode} location='output.code' resizable={true} />
      </Fieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={outputData.sudo} onChange={updateSudo} />
    </>
  );
};
