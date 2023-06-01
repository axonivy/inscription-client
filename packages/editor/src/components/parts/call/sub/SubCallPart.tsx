import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext } from '../../../../context';
import { PartProps, usePartDirty, usePartState } from '../../../props';
import { MappingInfo } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect, { CallableStartItem } from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../../../../components/widgets';

export function useSubCallPart(): PartProps {
  const { callData, defaultData, initData } = useCallData();
  const { processCallData, defaultProcessData, initProcessData, resetData } = useProcessCallData();
  const currentData = [callData.call, processCallData.processCall];
  const state = usePartState([defaultData.call, defaultProcessData.processCall], currentData, []);
  const dirty = usePartDirty([initData.call, initProcessData.processCall], currentData);
  return { name: 'Process Call', state, reset: { dirty, action: () => resetData() }, content: <SubCallPart /> };
}

const SubCallPart = () => {
  const { processCallData, updateProcessCall } = useProcessCallData();
  const [startItems, setStartItems] = useState<CallableStartItem[]>([]);

  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.callSubStarts(editorContext.pid).then(starts => setStartItems(CallableStartItem.map(starts)));
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
          startIcon={IvyIcons.SubStart}
          processIcon={IvyIcons.Sub}
          comboboxInputProps={callField.inputProps}
        />
      </Fieldset>
      <CallMapping mappingInfo={mappingInfo} />
    </>
  );
};
