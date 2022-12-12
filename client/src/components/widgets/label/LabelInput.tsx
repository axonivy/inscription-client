import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import { Message } from '../../props/message';
import './LabelInput.css';

const LabelInput = (props: { label: string; htmlFor: string; message?: Message; children: JSX.Element }) => (
  <div className='label-input-column'>
    <Label className='label' htmlFor={props.htmlFor}>
      {props.label}
    </Label>
    {props.children}
    {props.message && <div className={`input-message input-${props.message.severity}`}>{props.message.message}</div>}
  </div>
);

export default memo(LabelInput);
