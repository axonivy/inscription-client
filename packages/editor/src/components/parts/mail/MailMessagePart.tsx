import type { SelectItem} from '../../widgets/index.js';
import { Fieldset, MacroArea, Select, useFieldset } from '../../widgets/index.js';
import type { PartProps} from '../../editors/index.js';
import { usePartDirty, usePartState } from '../../editors/index.js';
import { useMailData } from './useMailData.js';
import type { MailData } from '@axonivy/inscription-protocol';
import { MAIL_TYPE } from '@axonivy/inscription-protocol';
import { useValidations } from '../../../context/index.js';
import { PathFieldset } from '../common/index.js';
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
  const messageFieldset = useFieldset();
  const typeFieldset = useFieldset();

  const typeItems = useMemo<SelectItem[]>(() => Object.values(MAIL_TYPE).map(value => ({ label: value, value })), []);

  return (
    <>
      <PathFieldset label='Message' {...messageFieldset.labelProps} path='message'>
        <MacroArea
          value={config.message.body}
          onChange={change => updateMessage('body', change)}
          browsers={['attr', 'func', 'cms']}
          {...messageFieldset.inputProps}
        />
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
