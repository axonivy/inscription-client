import './Fieldset.css';
import type { LabelProps } from '@radix-ui/react-label';
import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import type { FieldsetControl } from './fieldset-control';
import type { MessageTextProps } from '../message/Message';
import { MessageText } from '../message/Message';
import HeadlineControls from '../headlineControls/HeadlineControls';

export type FieldsetProps = LabelProps &
  MessageTextProps & {
    label?: string;
    controls?: FieldsetControl[];
  };

const Fieldset = ({ label, controls, message, children, ...labelProps }: FieldsetProps) => {
  const severiry = message ? `fieldset-${message.severity.toString().toLowerCase()}` : '';
  return (
    <div className='fieldset-column'>
      {label && (
        <div className='fieldset-label'>
          <Label {...labelProps} className={`label ${labelProps.className}`}>
            {label}
          </Label>
          {controls && <HeadlineControls controls={controls} />}
        </div>
      )}
      <div className={`fieldset-input ${severiry}`}>{children}</div>
      <MessageText message={message} />
    </div>
  );
};

export default memo(Fieldset);
