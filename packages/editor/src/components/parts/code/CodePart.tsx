import type { CodeData } from '@axonivy/inscription-protocol';
import type { PartProps} from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { ScriptArea, useFieldset } from '../../widgets';
import { useCodeData } from './useCodeData';
import { useValidations } from '../../../context';
import { PathFieldset } from '../common';

export function useCodePart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useCodeData();
  const compareData = (data: CodeData) => [data.code];
  const validation = useValidations(['code']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Code', state, reset: { dirty, action: () => reset() }, content: <CodePart /> };
}

const CodePart = () => {
  const { config, update } = useCodeData();
  const codeFieldset = useFieldset();

  return (
    <PathFieldset label='Code' {...codeFieldset.labelProps} path='code'>
      <ScriptArea
        value={config.code}
        onChange={change => update('code', change)}
        browsers={['attr', 'func', 'datatype', 'cms']}
        {...codeFieldset.inputProps}
      />
    </PathFieldset>
  );
};
