import './Fieldset.css';
import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import Button from '../button/Button';
import IvyIcon from '../IvyIcon';
import { LabelProps } from '@radix-ui/react-label';
import { FieldsetControl } from './fieldset-control';
import { Message } from '../../../components/props';

export type FieldsetProps = LabelProps & {
  label: string;
  controls?: FieldsetControl[];
  message?: Message;
};

const Fieldset = ({ label, controls, message, children, ...labelProps }: FieldsetProps) => {
  const severiry = message ? `fieldset-${message.severity.toString().toLowerCase()}` : '';
  return (
    <div className='fieldset-column'>
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
      <div className={`fieldset-input ${severiry}`}>{children}</div>
      {message && (
        <div className={`fieldset-message ${severiry}`}>
          <IvyIcon icon={message.severity} />
          {message.message}
        </div>
      )}
    </div>
  );
};

export default memo(Fieldset);
