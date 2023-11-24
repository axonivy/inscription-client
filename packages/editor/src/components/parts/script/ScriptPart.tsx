import type { ScriptData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { ScriptArea, useFieldset } from '../../widgets/index.js';
import { useScriptData } from './useScriptData.js';
import { useValidations } from '../../../context/index.js';
import { PathFieldset } from '../common/index.js';

export function useScriptPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useScriptData();
  const compareData = (data: ScriptData) => [data.code];
  const validation = useValidations(['code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Script', state, reset: { dirty, action: () => reset() }, content: <ScriptPart /> };
}

const ScriptPart = () => {
  const { config, update } = useScriptData();
  const codeFieldset = useFieldset();

  return (
    <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
      <ScriptArea
        value={config.code}
        onChange={change => update('code', change)}
        browsers={['attr', 'func', 'type', 'cms']}
        {...codeFieldset.inputProps}
      />
    </PathFieldset>
  );
};
