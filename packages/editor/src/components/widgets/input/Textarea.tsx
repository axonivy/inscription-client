import './Input.css';
import { ComponentProps } from 'react';
import { useReadonly } from '../../../context';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (change: string) => void;
};

const Textarea = ({ value, onChange, ...textareaProps }: TextareaProps) => {
  const readonly = useReadonly();

  return (
    <textarea
      {...textareaProps}
      className={`input ${textareaProps.className ?? ''}`}
      value={value ?? ''}
      onChange={event => onChange(event.target.value)}
      disabled={readonly}
    />
  );
};

export default Textarea;
