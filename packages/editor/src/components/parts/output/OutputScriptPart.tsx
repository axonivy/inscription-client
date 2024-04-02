import type { OutputData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { Checkbox, ScriptArea } from '../../widgets';
import { useOutputData } from './useOutputData';
import { useValidations } from '../../../context';
import { PathCollapsible, ValidationFieldset } from '../common';
import { splitNewLine } from '../../../utils/utils';
import { useMemo } from 'react';
import useMaximizedCodeEditor from '../../browser/useMaximizedCodeEditor';

export function useOutputScriptPart(): PartProps {
  const { config, defaultConfig, initConfig, resetCode } = useOutputData();
  const compareData = (data: OutputData) => [data.output.code, data.sudo];
  const validation = useValidations(['output', 'code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Script', state, reset: { dirty, action: () => resetCode() }, content: <OutputScriptPart /> };
}

const OutputScriptPart = () => {
  const { config, defaultConfig, update, updateSudo } = useOutputData();
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();

  const initHeight = useMemo(() => {
    const height = splitNewLine(config.output.code).length * 18 + 20;
    if (height < 90) {
      return 90;
    }
    return height;
  }, [config.output.code]);

  return (
    <PathCollapsible
      label='Code'
      path='output'
      controls={[maximizeCode]}
      defaultOpen={config.output.code !== defaultConfig.output.code || config.sudo !== defaultConfig.sudo}
    >
      <ValidationFieldset>
        <ScriptArea
          maximizeState={maximizeState}
          value={config.output.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type', 'cms']}
          initHeight={initHeight}
        />
      </ValidationFieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </PathCollapsible>
  );
};
