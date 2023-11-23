import { IvyIcons } from '@axonivy/editor-icons';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { Checkbox, useFieldset } from '../../widgets';
import { useSignalCatchData } from './useSignalCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import type { SignalCatchData } from '@axonivy/inscription-protocol';
import type { EventCodeItem } from '../common';
import { EventCodeSelect, PathFieldset } from '../common';
import { eventCodeInfo } from '../../../utils/event-code';

export function useSignalCatchPart(options?: { makroSupport?: boolean; withBrowser?: boolean }): PartProps {
  const { config, defaultConfig, initConfig, resetData } = useSignalCatchData();
  const compareData = (data: SignalCatchData) => [data.signalCode, options?.makroSupport ? '' : data.attachToBusinessCase];
  const validations = useValidations(['signalCode']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return {
    name: 'Signal',
    state,
    reset: { dirty, action: () => resetData() },
    content: <SignalCatchPart makroSupport={options?.makroSupport} withBrowser={options?.withBrowser} />
  };
}

const SignalCatchPart = ({ makroSupport, withBrowser }: { makroSupport?: boolean; withBrowser?: boolean }) => {
  const { config, update, updateSignal } = useSignalCatchData();
  const { context } = useEditorContext();
  const signalCodes = [
    { value: '', eventCode: '<< Empty >>', info: 'Receives every signal' },
    ...useMeta('meta/workflow/signalCodes', { context, macro: !!makroSupport }, []).data.map<EventCodeItem>(code => {
      return { ...code, value: code.eventCode, info: eventCodeInfo(code) };
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
          eventIcon={IvyIcons.StartSignal}
          comboboxInputProps={signalField.inputProps}
          withBrowser={withBrowser}
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
