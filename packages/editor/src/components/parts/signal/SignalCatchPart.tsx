import { IvyIcons } from '@axonivy/editor-icons';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, Fieldset, useFieldset } from '../../widgets';
import EventCodeSelect, { EventCodeItem } from '../common/eventcode/EventCodeSelect';
import { useSignalCatchData } from './useSignalCatchData';
import { useEffect, useState } from 'react';
import { useClient, useEditorContext } from '../../../context';
import { useDefaultNameSyncher } from '../name/useNameSyncher';

export function useSignalCatchPart(options?: { makroSupport?: boolean }): PartProps {
  const { data, defaultData, initData, resetData } = useSignalCatchData();
  const currentData = [data.signalCode, options?.makroSupport ? '' : data.attachToBusinessCase];
  const state = usePartState([defaultData.signalCode, options?.makroSupport ? '' : defaultData.attachToBusinessCase], currentData, []);
  const dirty = usePartDirty([initData.signalCode, options?.makroSupport ? '' : initData.attachToBusinessCase], currentData);
  return {
    name: 'Signal',
    state,
    reset: { dirty, action: () => resetData() },
    content: <SignalCatchPart makroSupport={options?.makroSupport} />
  };
}

const SignalCatchPart = ({ makroSupport }: { makroSupport?: boolean }) => {
  const { data, updateSignalCode, updateAttachToBusinessCase } = useSignalCatchData();
  const [signalCodes, setSignalCodes] = useState<EventCodeItem[]>([]);
  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.signalCodes(editorContext.pid).then(codes =>
      setSignalCodes([
        { value: '', eventCode: '<< Empty >>', info: 'Receives every signal' },
        ...codes.map(code => {
          return { ...code, value: code.eventCode, info: code.usage > 0 ? `${code.project} > ${code.process} (${code.usage})` : undefined };
        })
      ])
    );
  }, [client, editorContext.pid]);

  useDefaultNameSyncher({ synchName: data.signalCode });

  const signalField = useFieldset();

  return (
    <>
      <Fieldset label='Signal Code' {...signalField.labelProps}>
        <EventCodeSelect
          eventCode={data.signalCode}
          onChange={change => updateSignalCode(change)}
          eventCodes={signalCodes}
          eventIcon={IvyIcons.Signal}
          comboboxInputProps={signalField.inputProps}
        />
      </Fieldset>
      {!makroSupport && (
        <Checkbox
          label='Attach to Business Case that signaled this process'
          value={data.attachToBusinessCase}
          onChange={change => updateAttachToBusinessCase(change)}
        />
      )}
    </>
  );
};
