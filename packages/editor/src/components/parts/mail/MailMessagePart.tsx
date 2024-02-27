import type { SelectItem } from '../../widgets';
import { Fieldset, MacroArea, Select } from '../../widgets';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useMailData } from './useMailData';
import type { MailData } from '@axonivy/inscription-protocol';
import { MAIL_TYPE } from '@axonivy/inscription-protocol';
import { useValidations } from '../../../context';
import { PathFieldset } from '../common';
import { useMemo } from 'react';

export function useMailMessagePart(): PartProps {
  const { config, initConfig, defaultConfig, resetMessage } = useMailData();
  const compareData = (data: MailData) => [data.message];
  const validations = useValidations(['message']);
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Content', state, reset: { dirty, action: () => resetMessage() }, content: <MailMessagePart /> };
}

const MailMessagePart = () => {
  const { config, updateMessage } = useMailData();
  const typeItems = useMemo<SelectItem[]>(() => Object.values(MAIL_TYPE).map(value => ({ label: value, value })), []);

  return (
    <>
      <PathFieldset label='Message' path='message'>
        <MacroArea value={config.message.body} onChange={change => updateMessage('body', change)} browsers={['attr', 'func', 'cms']} />
      </PathFieldset>
      <Fieldset label='Type'>
        <Select
          value={{ value: config.message.contentType, label: config.message.contentType }}
          items={typeItems}
          onChange={change => updateMessage('contentType', change.value)}
        />
      </Fieldset>
    </>
  );
};
