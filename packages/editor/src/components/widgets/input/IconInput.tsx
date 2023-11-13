import './IconInput.css';
import type { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import type { InputProps } from './Input';
import Input from './Input';
import { forwardRef } from 'react';

export type IconInputProps = InputProps & {
  icon: IvyIcons;
};

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(({ icon, ...props }, forwardedRef) => {
  return (
    <div className='icon-input'>
      <IvyIcon icon={icon} />
      <Input {...props} ref={forwardedRef} />
    </div>
  );
});

export default IconInput;
