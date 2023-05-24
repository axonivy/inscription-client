import { useEffect, useMemo, useState } from 'react';
import { useClient, useEditorContext } from '../../../../context';
import { PartProps, usePartState } from '../../../props';
import { MappingInfo } from '@axonivy/inscription-protocol';
import CallMapping from '../CallMapping';
import { useCallData, useProcessCallData } from '../useCallData';
import CallSelect, { CallableStartItem } from '../CallSelect';
import { IvyIcons } from '@axonivy/editor-icons';
import { Fieldset, useFieldset } from '../../../../components/widgets';

export function useSubCallPart(): PartProps {
  const { callData, defaultData } = useCallData();
  const { processCallData, defaultProcessData } = useProcessCallData();
  const state = usePartState([defaultData.call, defaultProcessData.processCall], [callData.call, processCallData.processCall], []);
  return { name: 'Process Call', state, content: <SubCallPart /> };
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
