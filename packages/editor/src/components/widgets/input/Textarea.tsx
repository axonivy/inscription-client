import './Input.css';
import { ComponentProps } from 'react';
import { useReadonly } from '../../../context';
import { FieldsetData } from '../fieldset';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  data: FieldsetData<string>;
};

const Textarea = ({ data, ...textareaProps }: TextareaProps) => {
  const readonly = useReadonly();

  return (
    <textarea
      {...textareaProps}
      className={`input ${textareaProps.className ?? ''}`}
      value={data.data ?? ''}
      onChange={event => data.updateData(event.target.value)}
      disabled={readonly}
    />
  );
};

export default Textarea;
