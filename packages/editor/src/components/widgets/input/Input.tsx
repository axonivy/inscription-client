import type { ComponentProps } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { useReadonly } from '../../../context';
import './Input.css';

export type InputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'ref'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ value, onChange, disabled, ...props }, forwardedRef) => {
  const [currentValue, setCurrentValue] = useState(value ?? '');
  useEffect(() => {
    setCurrentValue(value ?? '');
  }, [value]);
  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const update = event.target.value;
    setCurrentValue(update);
    onChange(update);
  };
  const readonly = useReadonly();

  return (
    <input
      {...props}
      ref={forwardedRef}
      className={`input ${props.className ?? ''}`}
      value={currentValue}
      onChange={updateValue}
      disabled={readonly || disabled}
    />
  );
});

export default Input;
