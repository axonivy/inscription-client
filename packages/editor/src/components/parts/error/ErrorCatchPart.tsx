import { useEffect, useState } from 'react';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { Fieldset, useFieldset } from '../../widgets';
import { useErrorCatchData } from './useErrorCatchData';
import { useClient, useEditorContext } from '../../../context';
import EventCodeSelect, { EventCodeItem } from '../common/eventcode/EventCodeSelect';
import { IvyIcons } from '@axonivy/editor-icons';

export function useErrorCatchPart(): PartProps {
  const { data, defaultData, initData, resetData } = useErrorCatchData();
  const state = usePartState(defaultData.errorCode, data.errorCode, []);
  const dirty = usePartDirty(initData.errorCode, data.errorCode);
  return {
    name: 'Error',
    state,
    reset: { dirty, action: () => resetData() },
    content: <ErrorCatchPart />
  };
}

const ErrorCatchPart = () => {
  const { data, updateErrorCode } = useErrorCatchData();
  const [errorCodes, setErrorCodes] = useState<EventCodeItem[]>([]);
  const editorContext = useEditorContext();
  const client = useClient();
  useEffect(() => {
    client.errorCodes(editorContext.pid).then(codes =>
      setErrorCodes([
        { value: '', eventCode: '<< Empty >>', info: 'Catches all errors' },
        ...codes.map(code => {
          return { ...code, value: code.eventCode, info: code.usage > 0 ? `${code.project} > ${code.process} (${code.usage})` : undefined };
        })
      ])
    );
  }, [client, editorContext.pid]);
  const errorField = useFieldset();

  return (
    <>
      <Fieldset label='Error Code' {...errorField.labelProps}>
        <EventCodeSelect
          eventCode={data.errorCode}
          onChange={change => updateErrorCode(change)}
          eventCodes={errorCodes}
          eventIcon={IvyIcons.ErrorEvent}
          comboboxInputProps={errorField.inputProps}
        />
      </Fieldset>
    </>
  );
};
