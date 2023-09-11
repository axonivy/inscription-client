import './Fieldset.css';
import { Label, LabelProps } from '@radix-ui/react-label';
import { memo } from 'react';
import Button from '../button/Button';
import { FieldsetControl } from './fieldset-control';
import { MessageText, MessageTextProps } from '../message/Message';

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
          <div className='fieldset-controls'>
            {controls?.map((control, index) => (
              <Button
                icon={control.icon}
                key={index}
                aria-label={control.label}
                className='fieldset-control-button'
                onClick={control.action}
                data-state={control.active ? 'active' : 'inactive'}
              />
            ))}
          </div>
        </div>
      )}
      <div className={`fieldset-input ${severiry}`}>{children}</div>
      <MessageText message={message} />
    </div>
  );
};

export default memo(Fieldset);
