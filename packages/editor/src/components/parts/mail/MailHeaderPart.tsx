import { Fieldset, Input, useFieldset } from '../../widgets';
import { PartProps, usePartDirty, usePartState } from '../../props';
import { useMailHeaderData } from './useMailHeaderData';

export function useMailHeaderPart(): PartProps {
  const { data, initData, defaultData, resetData } = useMailHeaderData();
  const state = usePartState(defaultData.headers, data.headers, []);
  const dirty = usePartDirty(initData.headers, data.headers);
  return { name: 'Header', state, reset: { dirty, action: () => resetData() }, content: <MailHeaderPart /> };
}

const MailHeaderPart = () => {
  const { data, updateSubject, updateFrom, updateReplyTo, updateTo, updateCc, updateBcc } = useMailHeaderData();
  const subjectFieldset = useFieldset();
  const fromFieldset = useFieldset();
  const replyToFieldset = useFieldset();
  const toFieldset = useFieldset();
  const ccFieldset = useFieldset();
  const bccFieldset = useFieldset();

  return (
    <>
      <Fieldset label='Subject' {...subjectFieldset.labelProps}>
        <Input value={data.headers.subject} onChange={change => updateSubject(change)} {...subjectFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='From' {...fromFieldset.labelProps}>
        <Input value={data.headers.from} onChange={change => updateFrom(change)} {...fromFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='Reply to' {...replyToFieldset.labelProps}>
        <Input value={data.headers.replyTo} onChange={change => updateReplyTo(change)} {...replyToFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='To' {...toFieldset.labelProps}>
        <Input value={data.headers.to} onChange={change => updateTo(change)} {...toFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='CC' {...ccFieldset.labelProps}>
        <Input value={data.headers.cc} onChange={change => updateCc(change)} {...ccFieldset.inputProps} />
      </Fieldset>
      <Fieldset label='BCC' {...bccFieldset.labelProps}>
        <Input value={data.headers.bcc} onChange={change => updateBcc(change)} {...bccFieldset.inputProps} />
      </Fieldset>
    </>
  );
};
