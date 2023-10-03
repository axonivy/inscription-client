import { ProgramStartData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useValidations } from '../../../context';
import { Input, useFieldset } from '../../widgets';
import { PathFieldset } from '../common';
import { useStartData } from './useStartData';
import { Permission } from '../common/permission/Permission';

export function useProgramStartPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useStartData();
  const compareData = (data: ProgramStartData) => [data.javaClass, data.permission];
  const validation = useValidations(['javaClass']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Start', state, reset: { dirty, action: () => reset() }, content: <StartPart /> };
}

const StartPart = () => {
  const { config, defaultConfig, update, updatePermission } = useStartData();

  const javaClassField = useFieldset();

  return (
    <>
      <PathFieldset label='Java Class' {...javaClassField.labelProps} path='javaClass'>
        <Input value={config.javaClass} onChange={change => update('javaClass', change)} {...javaClassField.inputProps} />
      </PathFieldset>
      <Permission
        anonymousFieldActive={true}
        config={config.permission}
        defaultConfig={defaultConfig.permission}
        updatePermission={updatePermission}
      />
    </>
  );
};
