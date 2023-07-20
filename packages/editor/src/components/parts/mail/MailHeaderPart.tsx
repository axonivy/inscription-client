import { Checkbox, Collapsible, MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailData } from './useMailData';
import { IVY_EXCEPTIONS, MailData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { ExceptionSelect, IGNROE_EXCEPTION, PathFieldset } from '../common';

export function useMailHeaderPart(): PartProps {
  const { config, initConfig, defaultConfig, resetHeaders } = useMailData();
  const compareData = (data: MailData) => [data.headers, data.failIfMissingAttachments, data.exceptionHandler];
  const headerValidations = useValidations('headers');
  const exceptionValidations = useValidations('exceptionHandler');
  const state = usePartState(compareData(defaultConfig), compareData(config), [...headerValidations, ...exceptionValidations]);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Header', state, reset: { dirty, action: () => resetHeaders() }, content: <MailHeaderPart /> };
}

const MailHeaderPart = () => {
  const { config, update, updateHeader } = useMailData();
  const subjectFieldset = useFieldset();
  const fromFieldset = useFieldset();
  const replyToFieldset = useFieldset();
  const toFieldset = useFieldset();
  const ccFieldset = useFieldset();
  const bccFieldset = useFieldset();
  const exceptionFieldset = useFieldset();

  return (
    <>
      <PathContext path='headers'>
        <PathFieldset label='Subject' {...subjectFieldset.labelProps} path='subject'>
          <MacroInput value={config.headers.subject} onChange={change => updateHeader('subject', change)} {...subjectFieldset.inputProps} />
        </PathFieldset>
        <PathFieldset label='From' {...fromFieldset.labelProps} path='from'>
          <MacroInput value={config.headers.from} onChange={change => updateHeader('from', change)} {...fromFieldset.inputProps} />
        </PathFieldset>
        <PathFieldset label='Reply to' {...replyToFieldset.labelProps} path='replyTo'>
          <MacroInput value={config.headers.replyTo} onChange={change => updateHeader('replyTo', change)} {...replyToFieldset.inputProps} />
        </PathFieldset>
        <PathFieldset label='To' {...toFieldset.labelProps} path='to'>
          <MacroInput value={config.headers.to} onChange={change => updateHeader('to', change)} {...toFieldset.inputProps} />
        </PathFieldset>
        <PathFieldset label='CC' {...ccFieldset.labelProps} path='cc'>
          <MacroInput value={config.headers.cc} onChange={change => updateHeader('cc', change)} {...ccFieldset.inputProps} />
        </PathFieldset>
        <PathFieldset label='BCC' {...bccFieldset.labelProps} path='bcc'>
          <MacroInput value={config.headers.bcc} onChange={change => updateHeader('bcc', change)} {...bccFieldset.inputProps} />
        </PathFieldset>
      </PathContext>
      <Collapsible label='Options' defaultOpen={config.failIfMissingAttachments || config.exceptionHandler !== IVY_EXCEPTIONS.mail}>
        <PathFieldset label='Error' {...exceptionFieldset.labelProps} path='exceptionHandler'>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            inputProps={exceptionFieldset.inputProps}
            staticExceptions={[IVY_EXCEPTIONS.mail, IGNROE_EXCEPTION]}
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
