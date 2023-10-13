import { Checkbox, Collapsible, MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../editors';
import { useMailData } from './useMailData';
import { IVY_EXCEPTIONS, MailData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { ExceptionSelect, PathFieldset } from '../common';
import { BrowserType } from '../../../components/browser';

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
  const subjectFieldset = useFieldset();
  const fromFieldset = useFieldset();
  const replyToFieldset = useFieldset();
  const toFieldset = useFieldset();
  const ccFieldset = useFieldset();
  const bccFieldset = useFieldset();
  const exceptionFieldset = useFieldset();

  const borwserTypes: BrowserType[] = ['attr', 'func', 'cms'];

  return (
    <>
      <PathContext path='headers'>
        <PathFieldset label='Subject' {...subjectFieldset.labelProps} path='subject'>
          <MacroInput
            value={config.headers.subject}
            onChange={change => updateHeader('subject', change)}
            browsers={borwserTypes}
            {...subjectFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='From' {...fromFieldset.labelProps} path='from'>
          <MacroInput
            value={config.headers.from}
            onChange={change => updateHeader('from', change)}
            browsers={borwserTypes}
            {...fromFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='Reply to' {...replyToFieldset.labelProps} path='replyTo'>
          <MacroInput
            value={config.headers.replyTo}
            onChange={change => updateHeader('replyTo', change)}
            browsers={borwserTypes}
            {...replyToFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='To' {...toFieldset.labelProps} path='to'>
          <MacroInput
            value={config.headers.to}
            onChange={change => updateHeader('to', change)}
            browsers={borwserTypes}
            {...toFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='CC' {...ccFieldset.labelProps} path='cc'>
          <MacroInput
            value={config.headers.cc}
            onChange={change => updateHeader('cc', change)}
            browsers={borwserTypes}
            {...ccFieldset.inputProps}
          />
        </PathFieldset>
        <PathFieldset label='BCC' {...bccFieldset.labelProps} path='bcc'>
          <MacroInput
            value={config.headers.bcc}
            onChange={change => updateHeader('bcc', change)}
            browsers={borwserTypes}
            {...bccFieldset.inputProps}
          />
        </PathFieldset>
      </PathContext>
      <Collapsible
        label='Options'
        defaultOpen={config.failIfMissingAttachments || config.exceptionHandler !== defaultConfig.exceptionHandler}
      >
        <PathFieldset label='Error' {...exceptionFieldset.labelProps} path='exceptionHandler'>
          <ExceptionSelect
            value={config.exceptionHandler}
            onChange={change => update('exceptionHandler', change)}
            inputProps={exceptionFieldset.inputProps}
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
