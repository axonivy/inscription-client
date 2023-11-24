import type { ProgramStartData } from '@axonivy/inscription-protocol';
import type { PartProps} from '../../../editors/index.js';
import { usePartDirty, usePartState } from '../../../editors/index.js';
import { useValidations } from '../../../../context/index.js';
import { useProgramStartData } from './useProgramStartData.js';
import { Permission } from '../../common/permission/Permission.js';
import JavaClassSelector from '../JavaClassSelector.js';

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
