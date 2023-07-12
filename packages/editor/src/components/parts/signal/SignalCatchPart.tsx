import { IvyIcons } from '@axonivy/editor-icons';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Checkbox, Fieldset, useFieldset } from '../../widgets';
import EventCodeSelect, { EventCodeItem } from '../common/eventcode/EventCodeSelect';
import { useSignalCatchData } from './useSignalCatchData';
import { useEffect, useState } from 'react';
import { useClient, useEditorContext } from '../../../context';
import { useDefaultNameSyncher } from '../name/useNameSyncher';
import { SignalCatchData } from '@axonivy/inscription-protocol';

export function useSignalCatchPart(options?: { makroSupport?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useSignalCatchData();
  const compareData = (data: SignalCatchData) => [data.signalCode, options?.makroSupport ? '' : data.attachToBusinessCase];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Signal',
    state,
    reset: { dirty, action: () => resetData() },
    content: <SignalCatchPart makroSupport={options?.makroSupport} />
  };
}

const SignalCatchPart = ({ makroSupport }: { makroSupport?: boolean }) => {
  const { config, update } = useSignalCatchData();
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

  useDefaultNameSyncher({ synchName: config.signalCode });

  const signalField = useFieldset();

  return (
    <>
      <Fieldset label='Signal Code' {...signalField.labelProps}>
        {/* todo: somehow support macro input here... */}
        <EventCodeSelect
          eventCode={config.signalCode}
          onChange={change => update('signalCode', change)}
          eventCodes={signalCodes}
          eventIcon={IvyIcons.Signal}
          comboboxInputProps={signalField.inputProps}
        />
      </Fieldset>
      {!makroSupport && (
        <Checkbox
          label='Attach to Business Case that signaled this process'
          value={config.attachToBusinessCase}
          onChange={change => update('attachToBusinessCase', change)}
        />
      )}
    </>
  );
};
