import { IvyIcons } from '@axonivy/editor-icons';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { Checkbox, useFieldset } from '../../widgets';
import { useSignalCatchData } from './useSignalCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import { SignalCatchData } from '@axonivy/inscription-protocol';
import { EventCodeItem, EventCodeSelect, PathFieldset } from '../common';

export function useSignalCatchPart(options?: { makroSupport?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useSignalCatchData();
  const compareData = (data: SignalCatchData) => [data.signalCode, options?.makroSupport ? '' : data.attachToBusinessCase];
  const validations = useValidations(['signalCode']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Signal',
    state,
    reset: { dirty, action: () => resetData() },
    content: <SignalCatchPart makroSupport={options?.makroSupport} />
  };
}

const SignalCatchPart = ({ makroSupport }: { makroSupport?: boolean }) => {
  const { config, update, updateSignal } = useSignalCatchData();
  const { context } = useEditorContext();
  const signalCodes = [
    { value: '', eventCode: '<< Empty >>', info: 'Receives every signal' },
    ...useMeta('meta/workflow/signalCodes', context, []).data.map<EventCodeItem>(code => {
      return { ...code, value: code.eventCode, info: code.usage > 0 ? `${code.project} > ${code.process} (${code.usage})` : undefined };
    })
  ];

  const signalField = useFieldset();
  return (
    <>
      <PathFieldset label='Signal Code' {...signalField.labelProps} path='signalCode'>
        {/* todo: somehow support macro input here... */}
        <EventCodeSelect
          eventCode={config.signalCode}
          onChange={change => updateSignal(change)}
          eventCodes={signalCodes}
          eventIcon={IvyIcons.Signal}
          comboboxInputProps={signalField.inputProps}
        />
      </PathFieldset>
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
