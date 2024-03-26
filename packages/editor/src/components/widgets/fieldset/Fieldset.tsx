import { memo } from 'react';
import type { FieldsetControl } from './fieldset-control';
import type { MessageTextProps } from '../message/Message';
import { ButtonGroup, Fieldset as Field, type FieldsetProps as FieldProps } from '@axonivy/ui-components';
import type { Severity } from '@axonivy/inscription-protocol';

export type FieldsetProps = Omit<FieldProps, 'message' | 'control'> &
  MessageTextProps & {
    controls?: FieldsetControl[];
  };

const Controls = ({ controls }: Pick<FieldsetProps, 'controls'>) => {
  if (controls) {
    return (
      <ButtonGroup
        controls={controls.map(({ action, icon, label, active }) => ({ icon, title: label, onClick: action, toggle: active }))}
      />
    );
  }
  return null;
};

const Fieldset = ({ label, controls, message, ...props }: FieldsetProps) => {
  const severiry = message?.severity.toString().toLowerCase() as Lowercase<Severity>;
  return (
    <Field label={label} message={{ message: message?.message, variant: severiry }} control={<Controls controls={controls} />} {...props} />
  );
};

export default memo(Fieldset);
