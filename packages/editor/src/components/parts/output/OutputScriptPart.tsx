import type { OutputData } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { Checkbox, ScriptArea, useFieldset } from '../../widgets';
import { useOutputData } from './useOutputData';
import { PathContext, useValidations } from '../../../context';
import { PathFieldset } from '../common';
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
  const { config, update, updateSudo } = useOutputData();
  const codeFieldset = useFieldset();
  const { maximizeState, maximizeCode } = useMaximizedCodeEditor();

  const initHeight = useMemo(() => {
    const height = splitNewLine(config.output.code).length * 18 + 20;
    if (height < 90) {
      return 90;
    }
    return height;
  }, [config.output.code]);

  return (
    <PathContext path='output'>
      <PathFieldset label='Code' {...codeFieldset.labelProps} path='code' controls={[maximizeCode]}>
        <ScriptArea
          maximizeState={maximizeState}
          value={config.output.code}
          onChange={change => update('code', change)}
          browsers={['attr', 'func', 'type', 'cms']}
          initHeight={initHeight}
          {...codeFieldset.inputProps}
        />
      </PathFieldset>
      <Checkbox label='Disable Permission Checks (Execute this Script Step as SYSTEM)' value={config.sudo} onChange={updateSudo} />
    </PathContext>
  );
};
