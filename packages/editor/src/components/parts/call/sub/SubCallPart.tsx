import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../props';
import { CallData, CallableStart, VariableInfo, ProcessCallData } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../../../../components/widgets';

export function useSubCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useProcessCallData();
  const compareData = (callData: CallData, targetData: ProcessCallData) => [callData.call, targetData.processCall];
  const state = usePartState(
    compareData(callData.defaultConfig, targetData.defaultConfig),
    compareData(callData.config, targetData.config),
    []
  );
  const dirty = usePartDirty(compareData(callData.initConfig, targetData.initConfig), compareData(callData.config, targetData.config));
  return { name: 'Process Call', state, reset: { dirty, action: () => targetData.resetData() }, content: <SubCallPart /> };
}

const SubCallPart = () => {
  const { config, update } = useProcessCallData();
  const [startItems, setStartItems] = useState<CallableStart[]>([]);

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.callSubStarts(editorContext.pid).then(starts => setStartItems(starts));
  }, [client, editorContext.pid]);

  const variableInfo = useMemo<VariableInfo>(
    () => startItems.find(ds => ds.id === config.processCall)?.callParameter ?? { variables: [], types: {} },
    [config.processCall, startItems]
  );

  const callField = useFieldset();

  return (
    <>
      <Fieldset label='Process start' {...callField.labelProps}>
        <CallSelect
          start={config.processCall}
          onChange={change => update('processCall', change)}
          starts={startItems}
          startIcon={IvyIcons.SubStart}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping variableInfo={variableInfo} />
    </>
  );
};
