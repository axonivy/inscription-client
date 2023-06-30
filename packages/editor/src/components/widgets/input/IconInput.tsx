import './IconInput.css';
import { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import Input, { InputProps } from './Input';
import React from 'react';

export type IconInputProps = InputProps & {
  icon: IvyIcons;
};

const IconInput = React.forwardRef<HTMLInputElement, IconInputProps>(({ icon, ...props }, forwardedRef) => {
  return (
    <div className='icon-input'>
      <IvyIcon icon={icon} />
      <Input {...props} ref={forwardedRef} />
    </div>
  );
});

export default IconInput;
