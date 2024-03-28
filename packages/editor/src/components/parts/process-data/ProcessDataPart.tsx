import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import { useProcessDataData } from './useProcessDataData';
import type { ProcessDataData } from '@axonivy/inscription-protocol';
import { PathFieldset } from '../common';
import type { DataClassItem } from './ClassSelectorPart';
import DataClassSelector from './ClassSelectorPart';
import { Message } from '@axonivy/ui-components';

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
  const { context } = useEditorContext();
  const dataClasses = [
    ...useMeta('meta/scripting/dataClasses', context, []).data.map<DataClassItem>(dataClass => {
      return { ...dataClass, value: dataClass.fullQualifiedName };
    })
  ];

  return (
    <>
      <PathFieldset label='Data Class' path='data'>
        <DataClassSelector dataClass={config.data} onChange={change => update('data', change)} dataClasses={dataClasses} />
      </PathFieldset>
      <Message
        message='If the process data class changes, all already used fields must exist in the new data class. Otherwise existing mappings and scripts will be removed.'
        variant='warning'
      />
    </>
  );
};
