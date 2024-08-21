import type { ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import { usePartDirty, usePartState, type PartProps } from '../../../editors/part/usePart';
import { useProgramInterfaceData } from './useProgramInterfaceData';
import { useValidations } from '../../../../context';
import JavaClassSelector from '../JavaClassSelector';

export function useProgramInterfaceStartPart(): PartProps {
  const { config, defaultConfig, initConfig, resetJavaClass } = useProgramInterfaceData();
  const compareData = (data: ProgramInterfaceStartData) => [data.javaClass];
  const validation = useValidations(['javaClass']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Java Bean',
    state,
    reset: { dirty, action: () => resetJavaClass() },
    content: <ProgramInterfaceStartPart />
  };
}

const ProgramInterfaceStartPart = ({ thirdParty }: { thirdParty?: boolean }) => {
  const { config, update } = useProgramInterfaceData();

  return (
    <>
      {(thirdParty === undefined || thirdParty === false) && (
        <JavaClassSelector javaClass={config.javaClass} onChange={change => update('javaClass', change)} type='ACTIVITY' />
      )}
    </>
  );
};
