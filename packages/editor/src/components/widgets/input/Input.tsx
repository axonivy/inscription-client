import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { useReadonly } from '../../../context/index.js';
import './Input.js';

export type InputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'ref'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onChange, disabled, ...props }, forwardedRef) => {
  const readonly = useReadonly();

  return (
    <input
      {...props}
      ref={forwardedRef}
      className={`input ${props.className ?? ''}`}
      value={value ?? ''}
      onChange={event => onChange(event.target.value)}
      disabled={readonly || disabled}
    />
  );
});

export default Input;
