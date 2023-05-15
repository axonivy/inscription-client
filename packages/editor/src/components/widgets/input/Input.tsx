import { useReadonly } from '../../../context';
import './Input.css';
import { ComponentProps } from 'react';

export type InputProps = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Input = (props: InputProps) => {
  const readonly = useReadonly();

  return (
    <input
      {...props}
      className={`input ${props.className ?? ''}`}
      value={props.value ?? ''}
      onChange={event => props.onChange(event.target.value)}
      disabled={readonly}
    />
  );
};

export default Input;
