import { Checkbox, Collapsible, MacroInput } from '../../widgets';
import type { PartProps } from '../../editors';
import { usePartDirty, usePartState } from '../../editors';
import { useMailData } from './useMailData';
import type { MailData } from '@axonivy/inscription-protocol';
import { IVY_EXCEPTIONS } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { ExceptionSelect, PathFieldset } from '../common';
import type { BrowserType } from '../../../components/browser';

export function useMailHeaderPart(): PartProps {
  const { config, initConfig, defaultConfig, resetHeaders } = useMailData();
  const compareData = (data: MailData) => [data.headers, data.failIfMissingAttachments, data.exceptionHandler];
  const headerValidations = useValidations(['headers']);
  const exceptionValidations = useValidations(['exceptionHandler']);
  const state = usePartState(compareData(defaultConfig), compareData(config), [...headerValidations, ...exceptionValidations]);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Header', state, reset: { dirty, action: () => resetHeaders() }, content: <MailHeaderPart /> };
}

const MailHeaderPart = () => {
  const { config, defaultConfig, update, updateHeader } = useMailData();
  const borwserTypes: BrowserType[] = ['attr', 'func', 'cms'];

  return (
    <>
      <PathContext path='headers'>
        <PathFieldset label='Subject' path='subject'>
          <MacroInput value={config.headers.subject} onChange={change => updateHeader('subject', change)} browsers={borwserTypes} />
        </PathFieldset>
        <PathFieldset label='From' path='from'>
          <MacroInput value={config.headers.from} onChange={change => updateHeader('from', change)} browsers={borwserTypes} />
        </PathFieldset>
        <PathFieldset label='Reply to' path='replyTo'>
          <MacroInput value={config.headers.replyTo} onChange={change => updateHeader('replyTo', change)} browsers={borwserTypes} />
        </PathFieldset>
        <PathFieldset label='To' path='to'>
          <MacroInput value={config.headers.to} onChange={change => updateHeader('to', change)} browsers={borwserTypes} />
        </PathFieldset>
        <PathFieldset label='CC' path='cc'>
          <MacroInput value={config.headers.cc} onChange={change => updateHeader('cc', change)} browsers={borwserTypes} />
        </PathFieldset>
        <PathFieldset label='BCC' path='bcc'>
          <MacroInput value={config.headers.bcc} onChange={change => updateHeader('bcc', change)} browsers={borwserTypes} />
        </PathFieldset>
      </PathContext>
      <Collapsible
        label='Options'
        defaultOpen={config.failIfMissingAttachments || config.exceptionHandler !== defaultConfig.exceptionHandler}
      >
        <PathFieldset label='Error' path='exceptionHandler'>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            staticExceptions={[IVY_EXCEPTIONS.mail, IVY_EXCEPTIONS.ignoreException]}
          />
        </PathFieldset>
        <Checkbox
          label='Throw an error if any attachment is missing'
          value={config.failIfMissingAttachments}
          onChange={change => {
            update('failIfMissingAttachments', change);
          }}
        />
      </Collapsible>
    </>
  );
};
