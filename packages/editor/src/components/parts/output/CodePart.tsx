import { PartProps, usePartState } from '../../props';
import { Checkbox, CodeEditor, Fieldset } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodePart(): PartProps {
  const { outputData, defaultData } = useOutputData();
  const state = usePartState([defaultData.output.code, defaultData.sudo], [outputData.output.code, outputData.sudo], []);
  return { name: 'Code', state, content: <CodePart /> };
}

const CodePart = () => {
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
