import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, CodeEditor, Fieldset } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodePart(): PartProps {
  const { outputData, defaultData, initData, resetCode } = useOutputData();
  const currentData = [outputData.output.code, outputData.sudo];
  const state = usePartState([defaultData.output.code, defaultData.sudo], currentData, []);
  const dirty = usePartDirty([initData.output.code, initData.sudo], currentData);
  return { name: 'Code', state, reset: { dirty, action: () => resetCode() }, content: <CodePart /> };
}

const CodePart = () => {
  const { outputData, updater, updateSudo } = useOutputData();

  return (
    <>
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={outputData.output.code} onChange={change => updater('code', change)} location='output.code' resizable={true} />
      </Fieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={outputData.sudo} onChange={updateSudo} />
    </>
  );
};
