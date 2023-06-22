import { OutputData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, CodeEditor, Fieldset } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodePart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Code', state, reset: { dirty, action: () => resetCode() }, content: <CodePart /> };
}

const CodePart = () => {
  const { config, updater, updateSudo } = useOutputData();

  return (
    <>
      <Fieldset label='Code' htmlFor='code'>
        <CodeEditor code={config.output.code} onChange={change => updater('code', change)} location='output.code' resizable={true} />
      </Fieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </>
  );
};
