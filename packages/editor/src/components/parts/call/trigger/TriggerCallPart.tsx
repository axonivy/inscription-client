import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../props';
import { CallData, CallableStart, MappingInfo, ProcessCallData } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../../../../components/widgets';

export function useTriggerCallPart(): PartProps {
  const callData = useCallData();
  const targetData = useProcessCallData();
  const compareData = (callData: CallData, targetData: ProcessCallData) => [callData.call, targetData.processCall];
  const state = usePartState(
    compareData(callData.defaultConfig, targetData.defaultConfig),
    compareData(callData.config, targetData.config),
    []
  );
  const dirty = usePartDirty(compareData(callData.initConfig, targetData.initConfig), compareData(callData.config, targetData.config));
  return { name: 'Trigger', state, reset: { dirty, action: () => targetData.resetData() }, content: <TriggerCallPart /> };
}

const TriggerCallPart = () => {
  const { config, updateProcessCall } = useProcessCallData();
  const [startItems, setStartItems] = useState<CallableStart[]>([]);

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.triggerStarts(editorContext.pid).then(starts => setStartItems(starts));
  }, [client, editorContext.pid]);

  const mappingInfo = useMemo<MappingInfo>(
    () => startItems.find(ds => ds.id === config.processCall)?.callParameter ?? { variables: [], types: {} },
    [config.processCall, startItems]
  );

  const callField = useFieldset();

  return (
    <>
      <Fieldset label='Process start' {...callField.labelProps}>
        <CallSelect
          start={config.processCall}
          onChange={updateProcessCall}
          starts={startItems}
          startIcon={IvyIcons.Start}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping mappingInfo={mappingInfo} />
    </>
  );
};
