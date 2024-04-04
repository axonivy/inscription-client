import type { ScriptData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { ScriptArea } from '../../widgets';
import { useScriptData } from './useScriptData';
import { useValidations } from '../../../context';
import { PathCollapsible, ValidationFieldset } from '../common';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

export function useScriptPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useScriptData();
  const compareData = (data: ScriptData) => [data.code];
  const validation = useValidations(['code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Script', state, reset: { dirty, action: () => reset() }, content: <ScriptPart /> };
}

const ScriptPart = () => {
  const { config, defaultConfig, update } = useScriptData();
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();

  return (
    <PathCollapsible label='Code' path='code' controls={[maximizeCode]} defaultOpen={config.code !== defaultConfig.code}>
      <ValidationFieldset>
        <ScriptArea
          maximizeState={maximizeState}
          value={config.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type', 'cms']}
        />
      </ValidationFieldset>
    </PathCollapsible>
  );
};
