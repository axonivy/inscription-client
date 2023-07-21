import { OutputData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, ScriptArea, useFieldset } from '../../widgets';
import { useOutputData } from './useOutputData';
import { PathContext, useValidations } from '../../../context';
import { PathFieldset } from '../common';

export function useCodePart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const validation = useValidations('output').filter(val => val.path.includes('code'));
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Code', state, reset: { dirty, action: () => resetCode() }, content: <CodePart /> };
}

const CodePart = () => {
  const { config, update, updateSudo } = useOutputData();
  const codeFieldset = useFieldset();

  return (
    <PathContext path='output'>
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea value={config.output.code} onChange={change => update('code', change)} {...codeFieldset.inputProps} />
      </PathFieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </PathContext>
  );
};
