import { IVY_EXCEPTIONS, IVY_SCRIPT_TYPES, ProgramInterfaceStartData } from '@axonivy/inscription-protocol';
import { PartProps, usePartDirty, usePartState } from '../../../editors';
import { ExceptionSelect, PathCollapsible, PathFieldset } from '../../common';
import { useProgramInterfaceStartData } from './useProgramInterfaceStartData';
import { ScriptInput, useFieldset } from '../../../../components/widgets';
import { useValidations } from '../../../../context';
import { deepEqual } from '../../../../utils/equals';
import JavaClassSelector from '../JavaClassSelector';

export function useProgramInterfaceStartPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useProgramInterfaceStartData();
  const compareData = (data: ProgramInterfaceStartData) => [data.javaClass, data.exceptionHandler, data.timeout];
  const validation = [...useValidations(['timeout']), ...useValidations(['exceptionHandler']), ...useValidations(['javaClass'])];
  const state = usePartState(compareData(defaultConfig), compareData(config), validation);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Start',
    state,
    reset: { dirty, action: () => reset() },
    content: <ProgramInterfaceStartPart />
  };
}

const ProgramInterfaceStartPart = () => {
  const { config, defaultConfig, update, updateTimeout } = useProgramInterfaceStartData();

  const errorFieldset = useFieldset();
  const timeoutSecondsFieldset = useFieldset();
  const timeoutErrorFieldset = useFieldset();

  return (
    <>
      <JavaClassSelector config={config.javaClass} onChange={change => update('javaClass', change)} type='ACTIVITY' />

      <PathCollapsible label='Program' path='exceptionHandler' defaultOpen={config.exceptionHandler !== defaultConfig.exceptionHandler}>
        <PathFieldset label='Error' path='error' {...errorFieldset.labelProps}>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            staticExceptions={[IVY_EXCEPTIONS.programException, IVY_EXCEPTIONS.ignoreException]}
            inputProps={errorFieldset.inputProps}
          />
        </PathFieldset>
      </PathCollapsible>

      <PathCollapsible label='Timeout' path='timeout' defaultOpen={!deepEqual(config.timeout, defaultConfig.timeout)}>
        <PathFieldset label='Seconds' {...timeoutSecondsFieldset.labelProps} path='seconds'>
          <ScriptInput
            value={config.timeout.seconds}
            onChange={change => updateTimeout('seconds', change)}
            type={IVY_SCRIPT_TYPES.DURATION}
            {...timeoutSecondsFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='Error' path='error' {...timeoutErrorFieldset.labelProps}>
          <ExceptionSelect
            value={config.timeout.error}
            onChange={change => updateTimeout('error', change)}
            staticExceptions={[IVY_EXCEPTIONS.programTimeout, IVY_EXCEPTIONS.ignoreException]}
            inputProps={timeoutErrorFieldset.inputProps}
          />
        </PathFieldset>
      </PathCollapsible>
    </>
  );
};
