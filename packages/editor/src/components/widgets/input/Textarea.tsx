import './Input.css';
import { ComponentProps } from 'react';
import { useReadonly } from '../../../context';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Textarea = (props: TextareaProps) => {
  const readonly = useReadonly();

  return (
    <textarea
      {...props}
      className={`input ${props.className ?? ''}`}
      value={props.value ?? ''}
      onChange={event => props.onChange(event.target.value)}
      disabled={readonly}
    />
  );
};

export default Textarea;
