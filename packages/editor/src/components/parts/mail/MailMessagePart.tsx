import { Fieldset, MacroArea, Select, SelectItem, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailData } from './useMailData';
import { MAIL_TYPE, MailData } from '@axonivy/inscription-protocol';
import { useValidations } from '../../../context';
import { PathFieldset } from '../common';
import { useMemo } from 'react';

export function useMailMessagePart(): PartProps {
  const { config, initConfig, defaultConfig, resetMessage } = useMailData();
  const compareData = (data: MailData) => [data.message];
  const validations = useValidations('message');
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Content', state, reset: { dirty, action: () => resetMessage() }, content: <MailMessagePart /> };
}

const MailMessagePart = () => {
  const { config, updateMessage } = useMailData();
  const messageFieldset = useFieldset();
  const typeFieldset = useFieldset();

  const typeItems = useMemo<SelectItem[]>(() => Object.values(MAIL_TYPE).map(value => ({ label: value, value })), []);

  return (
    <>
      <PathFieldset label='Message' {...messageFieldset.labelProps} path='message'>
        <MacroArea value={config.message.body} onChange={change => updateMessage('body', change)} {...messageFieldset.inputProps} />
      </PathFieldset>
      <Fieldset label='Type' {...typeFieldset.labelProps}>
        <Select
          value={{ value: config.message.contentType, label: config.message.contentType }}
          items={typeItems}
          onChange={change => updateMessage('contentType', change.value)}
          inputProps={typeFieldset.inputProps}
        />
      </Fieldset>
    </>
  );
};
