import { ProgramStartData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../editors';
import { useValidations } from '../../../../context';
import { useProgramStartData } from './useProgramStartData';
import { Permission } from '../../common/permission/Permission';
import JavaClassSelector from '../JavaClassSelector';

export function useProgramStartPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useProgramStartData();
  const compareData = (data: ProgramStartData) => [data.javaClass, data.permission];
  const validation = useValidations(['javaClass']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Start',
    state,
    reset: { dirty, action: () => reset() },
    content: <ProgramStartPart />
  };
}

const ProgramStartPart = () => {
  const { config, defaultConfig, update, updatePermission } = useProgramStartData();

  return (
    <>
      <JavaClassSelector javaClass={config.javaClass} onChange={change => update('javaClass', change)} type='START' />
      <Permission
        anonymousFieldActive={true}
        config={config.permission}
        defaultConfig={defaultConfig.permission}
        updatePermission={updatePermission}
      />
    </>
  );
};
