import type { OutputData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { Checkbox, ScriptArea, useFieldset } from '../../widgets/index.js';
import { useOutputData } from './useOutputData.js';
import { PathContext, useValidations } from '../../../context/index.js';
import { PathFieldset } from '../common/index.js';

export function useOutputScriptPart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const validation = useValidations(['output', 'code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Script', state, reset: { dirty, action: () => resetCode() }, content: <OutputScriptPart /> };
}

const OutputScriptPart = () => {
  const { config, update, updateSudo } = useOutputData();
  const codeFieldset = useFieldset();

  return (
    <PathContext path='output'>
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
        <ScriptArea
          value={config.output.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type', 'cms']}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </PathContext>
  );
};
