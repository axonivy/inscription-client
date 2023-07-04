import { Fieldset, MacroInput, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailHeaderData } from './useMailHeaderData';
import { MailHeaderData } from '@axonivy/inscription-protocol';

export function useMailHeaderPart(): PartProps {
  const { config, initConfig, defaultConfig, resetData } = useMailHeaderData();
  const compareData = (data: MailHeaderData) => [data.headers];
  const state = usePartState(compareData(defaultConfig), compareData(config), []);
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
    <>
      <Fieldset label='Subject' {...subjectFieldset.labelProps}>
        <MacroInput
          value={config.headers.subject}
          onChange={change => update('subject', change)}
          location='headers.subject'
          {...subjectFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='From' {...fromFieldset.labelProps}>
        <MacroInput
          value={config.headers.from}
          onChange={change => update('from', change)}
          location='headers.from'
          {...fromFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='Reply to' {...replyToFieldset.labelProps}>
        <MacroInput
          value={config.headers.replyTo}
          onChange={change => update('replyTo', change)}
          location='headers.replyTo'
          {...replyToFieldset.inputProps}
        />
      </Fieldset>
      <Fieldset label='To' {...toFieldset.labelProps}>
        <MacroInput value={config.headers.to} onChange={change => update('to', change)} location='headers.to' {...toFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='CC' {...ccFieldset.labelProps}>
        <MacroInput value={config.headers.cc} onChange={change => update('cc', change)} location='headers.cc' {...ccFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='BCC' {...bccFieldset.labelProps}>
        <MacroInput
          value={config.headers.bcc}
          onChange={change => update('bcc', change)}
          location='headers.bcc'
          {...bccFieldset.inputProps}
        />
      </Fieldset>
    </>
  );
};
