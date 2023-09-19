import { PartProps, usePartDirty, usePartState } from '../../editors';
import { Input, MessageText, useFieldset } from '../../widgets';
import { useValidations } from '../../../context';
import { useProcessDataData } from './useProcessDataData';
import { IVY_SCRIPT_TYPES, ProcessDataData } from '@axonivy/inscription-protocol';
import { PathFieldset } from '../common';

export function useProcessDataPart(): PartProps {
  const { config, defaultConfig, initConfig, reset } = useProcessDataData();
  const compareData = (data: ProcessDataData) => [data.data];
  const validations = useValidations(['data']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Process Data',
    state,
    reset: { dirty, action: () => reset() },
    content: <ProcessDataPart />
  };
}

const ProcessDataPart = () => {
  const { config, update } = useProcessDataData();

  const dataClassField = useFieldset();

  return (
    <>
      <PathFieldset label='Data Class' {...dataClassField.labelProps} path='data'>
        <Input
          value={config.data}
          onChange={change => update('data', change)}
          type={IVY_SCRIPT_TYPES.STRING}
          {...dataClassField.inputProps}
        />
      </PathFieldset>
      <MessageText
        message={{
          severity: 'WARNING',
          message: `If the process data class changes, all already used fields must exist in the new data class. Otherwise existing mappings and scripts will be removed.`
        }}
      />
    </>
  );
};
