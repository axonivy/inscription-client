import './IconInput.css';
import type { IvyIcons } from '@axonivy/editor-icons';
import IvyIcon from '../IvyIcon';
import type { InputProps } from './Input';
import Input from './Input';
import { useEffect, useRef } from 'react';

export type IconInputProps = InputProps & {
  icon: IvyIcons;
  initFocus?: boolean;
};

const IconInput = ({ icon, initFocus, ...props }: IconInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [initFocus]);

  return (
    <div className='icon-input'>
      <IvyIcon icon={icon} />
      <Input {...props} ref={inputRef} />
    </div>
  );
};

export default IconInput;
