import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext } from '../../../../context';
import { PartProps, usePartState } from '../../../props';
import { MappingInfo } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect, { CallableStartItem } from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../../../../components/widgets';

export function useTriggerCallPart(): PartProps {
  const { callData, defaultData } = useCallData();
  const { processCallData, defaultProcessData } = useProcessCallData();
  const state = usePartState([defaultData.call, defaultProcessData.processCall], [callData.call, processCallData.processCall], []);
  return { name: 'Trigger', state, content: <TriggerCallPart /> };
}

const TriggerCallPart = () => {
  const { processCallData, updateProcessCall } = useProcessCallData();
  const [startItems, setStartItems] = useState<CallableStartItem[]>([]);

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.triggerStarts(editorContext.pid).then(starts => setStartItems(CallableStartItem.map(starts)));
  }, [client, editorContext.pid]);

  const mappingInfo = useMemo<MappingInfo>(
    () => startItems.find(ds => ds.id === processCallData.processCall)?.callParameter ?? { variables: [], types: {} },
    [processCallData.processCall, startItems]
  );

  const callField = useFieldset();

  return (
    <>
      <Fieldset label='Process start' {...callField.labelProps}>
        <CallSelect
          start={processCallData.processCall}
          onChange={updateProcessCall}
          starts={startItems}
          startIcon={IvyIcons.Start}
          processIcon={IvyIcons.Trigger}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping mappingInfo={mappingInfo} />
    </>
  );
};
