import { Label } from '@radix-ui/react-label';
import { memo, ReactNode } from 'react';
import './LabelInput.css';
import { Message } from '../../props/message';
import IvyIcon from '../IvyIcon';

const LabelInput = (props: { label: string; htmlFor: string; message?: Message; children: ReactNode }) => (
  <div className='label-input-column'>
    <Label className='label' htmlFor={props.htmlFor}>
      {props.label}
    </Label>
    {props.children}
    {props.message && (
      <div className={`input-message input-${props.message.severity}`}>
        <IvyIcon icon={props.message.severity} />
        {props.message.message}
      </div>
    )}
  </div>
);

export default memo(LabelInput);
