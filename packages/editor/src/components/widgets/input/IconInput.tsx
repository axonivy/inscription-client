import './IconInput.js';
import type { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';
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
