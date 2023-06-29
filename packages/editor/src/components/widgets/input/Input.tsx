import React from 'react';
import { useReadonly } from '../../../context';
import './Input.css';
import { ComponentProps } from 'react';

export type InputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, ...props }, forwardedRef) => {
  const readonly = useReadonly();

  return (
    <input
      {...props}
      className={`input ${props.className ?? ''}`}
      value={value ?? ''}
      onChange={event => onChange(event.target.value)}
      disabled={readonly}
      ref={forwardedRef}
    />
  );
});

export default Input;
