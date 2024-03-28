import { IvyIcons } from '@axonivy/ui-icons';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { Checkbox } from '../../widgets';
import { useSignalCatchData } from './useSignalCatchData';
import { useEditorContext, useMeta, useValidations } from '../../../context';
import type { SignalCatchData } from '@axonivy/inscription-protocol';
import type { ClassifiedItem } from '../common';
import { ClassificationCombobox, PathFieldset } from '../common';
import { classifiedItemInfo } from '../../../utils/event-code-categorie';

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
    { value: '', label: '<< Empty >>', info: 'Receives every signal' },
    ...useMeta('meta/workflow/signalCodes', { context, macro: !!makroSupport }, []).data.map<ClassifiedItem>(code => {
      return { ...code, value: code.eventCode, info: classifiedItemInfo(code) };
    })
  ];

  return (
    <>
      <PathFieldset label='Signal Code' path='signalCode'>
        <ClassificationCombobox
          value={config.signalCode}
          onChange={change => updateSignal(change)}
          data={signalCodes}
          icon={IvyIcons.StartSignal}
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
