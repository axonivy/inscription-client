import type { ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import { IVY_EXCEPTIONS, IVY_SCRIPT_TYPES } from '@axonivy/inscription-protocol';
import type { PartProps } from '../../../editors';
import { usePartDirty, usePartState } from '../../../editors';
import { ExceptionSelect, PathCollapsible, PathFieldset } from '../../common';
import { useProgramInterfaceStartData } from './useProgramInterfaceStartData';
import { ScriptInput } from '../../../../components/widgets';
import { useValidations } from '../../../../context';
import { deepEqual } from '../../../../utils/equals';
import JavaClassSelector from '../JavaClassSelector';

export function useProgramInterfaceStartPart(options?: { thirdParty?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, reset } = useProgramInterfaceStartData();
  const compareData = (data: ProgramInterfaceStartData) => [data.javaClass, data.exceptionHandler, data.timeout];
  const validation = [...useValidations(['timeout']), ...useValidations(['exceptionHandler']), ...useValidations(['javaClass'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Java Bean',
    state,
    reset: { dirty, action: () => reset() },
    content: <ProgramInterfaceStartPart thirdParty={options?.thirdParty} />
  };
}

const ProgramInterfaceStartPart = ({ thirdParty }: { thirdParty?: boolean }) => {
  const { config, defaultConfig, update, updateTimeout } = useProgramInterfaceStartData();

  return (
    <>
      {(thirdParty === undefined || thirdParty === false) && (
        <JavaClassSelector javaClass={config.javaClass} onChange={change => update('javaClass', change)} type='ACTIVITY' />
      )}

      <PathCollapsible label='Program' path='exceptionHandler' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler}>
        <PathFieldset label='Error' path='error'>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            staticExceptions={[IVY_EXCEPTIONS.programException, IVY_EXCEPTIONS.ignoreException]}
          />
        </PathFieldset>
      </PathCollapsible>

      <PathCollapsible label='Timeout' path='timeout' defaultOpen={!deepEqual(config.timeout, defaultConfig.timeout)}>
        <PathFieldset label='Seconds' path='seconds'>
          <ScriptInput
            value={config.timeout.seconds}
            onChange={change => updateTimeout('seconds', change)}
            type={IVY_SCRIPT_TYPES.DURATION}
            browsers={['attr', 'func', 'type']}
          />
        </PathFieldset>
        <PathFieldset label='Error' path='error'>
          <ExceptionSelect
            value={config.timeout.error}
            onChange={change => updateTimeout('error', change)}
            staticExceptions={[IVY_EXCEPTIONS.programTimeout, IVY_EXCEPTIONS.ignoreException]}
          />
        </PathFieldset>
      </PathCollapsible>
    </>
  );
};
