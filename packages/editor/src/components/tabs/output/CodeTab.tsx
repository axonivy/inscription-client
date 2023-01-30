import { DEFAULT_OUTPUT_DATA } from '@axonivy/inscription-protocol';
import { TabProps, useTabState } from '../../props';
import { Checkbox, CodeEditor, LabelInput } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodeTab(): TabProps {
  const { outputData } = useOutputData();
  const tabState = useTabState([DEFAULT_OUTPUT_DATA.output.code, DEFAULT_OUTPUT_DATA.sudo], [outputData.output.code, outputData.sudo], []);
  return { name: 'Code', state: tabState, content: <CodeTab /> };
}

const CodeTab = () => {
  const { outputData, updateCode, updateSudo } = useOutputData();

  return (
    <>
      <LabelInput label='Code' htmlFor='code'>
        <CodeEditor code={outputData.output.code} onChange={updateCode} location='output.code' resizable={true} />
      </LabelInput>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={outputData.sudo} onChange={updateSudo} />
    </>
  );
};
