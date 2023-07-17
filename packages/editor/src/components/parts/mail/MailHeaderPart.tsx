import { MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailHeaderData } from './useMailHeaderData';
import { MailHeaderData } from '@axonivy/inscription-protocol';
import { PathContext, useValidations } from '../../../context';
import { PathFieldset } from '../common/path/PathFieldset';

export function useMailHeaderPart(): PartProps {
  const { config, initConfig, defaultConfig, resetData } = useMailHeaderData();
  const compareData = (data: MailHeaderData) => [data.headers];
  const validations = useValidations('headers');
  const state = usePartState(compareData(defaultConfig), compareData(config), validations);
  const dirty = usePartDirty(compareData(initConfig), compareData(config));
  return { name: 'Header', state, reset: { dirty, action: () => resetData() }, content: <MailHeaderPart /> };
}

const MailHeaderPart = () => {
  const { config, update } = useMailHeaderData();
  const subjectFieldset = useFieldset();
  const fromFieldset = useFieldset();
  const replyToFieldset = useFieldset();
  const toFieldset = useFieldset();
  const ccFieldset = useFieldset();
  const bccFieldset = useFieldset();

  return (
    <PathContext path='headers'>
      <PathFieldset label='Subject' {...subjectFieldset.labelProps} path='subject'>
        <MacroInput value={config.headers.subject} onChange={change => update('subject', change)} {...subjectFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='From' {...fromFieldset.labelProps} path='from'>
        <MacroInput value={config.headers.from} onChange={change => update('from', change)} {...fromFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='Reply to' {...replyToFieldset.labelProps} path='replyTo'>
        <MacroInput value={config.headers.replyTo} onChange={change => update('replyTo', change)} {...replyToFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='To' {...toFieldset.labelProps} path='to'>
        <MacroInput value={config.headers.to} onChange={change => update('to', change)} {...toFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='CC' {...ccFieldset.labelProps} path='cc'>
        <MacroInput value={config.headers.cc} onChange={change => update('cc', change)} {...ccFieldset.inputProps} />
      </PathFieldset>
      <PathFieldset label='BCC' {...bccFieldset.labelProps} path='bcc'>
        <MacroInput value={config.headers.bcc} onChange={change => update('bcc', change)} {...bccFieldset.inputProps} />
      </PathFieldset>
    </PathContext>
  );
};
