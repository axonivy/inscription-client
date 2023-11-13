import type { OutputData } from '@axonivy/inscription-protocol';
import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { Checkbox, ScriptArea, useFieldset } from '../../widgets';
import { useOutputData } from './useOutputData';
import { PathContext, useValidations } from '../../../context';
import { PathFieldset } from '../common';

export function useOutputCodePart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const validation = useValidations(['output', 'code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Code', state, reset: { dirty, action: () => resetCode() }, content: <OutputCodePart /> };
}

const OutputCodePart = () => {
  const { config, update, updateSudo } = useOutputData();
  const codeFieldset = useFieldset();

  return (
    <PathContext path='output'>
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea
          value={config.output.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'datatype', 'cms']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </PathContext>
  );
};
