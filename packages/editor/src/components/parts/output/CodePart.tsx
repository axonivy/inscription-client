import { OutputData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, Fieldset, ScriptArea, useFieldset } from '../../widgets';
import { useOutputData } from './useOutputData';

export function useCodePart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Code', state, reset: { dirty, action: () => resetCode() }, content: <CodePart /> };
}

const CodePart = () => {
  const { config, update, updateSudo } = useOutputData();
  const codeFieldset = useFieldset();

  return (
    <>
      <Fieldset label='Code' {...codeFieldset.labelProps}>
        <ScriptArea
          value={config.output.code}
          onChange={change => update('code', change)}
          location='output.code'
          {...codeFieldset.inputProps}
        />
      </Fieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </>
  );
};
