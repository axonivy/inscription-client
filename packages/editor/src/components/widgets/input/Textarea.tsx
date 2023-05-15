import './Input.css';
import { ComponentProps } from 'react';
import { useReadonly } from '../../../context';
import { FieldsetData } from '../fieldset';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  data: FieldsetData<string>;
};

const Textarea = (props: TextareaProps) => {
  const readonly = useReadonly();

  return (
    <textarea
      {...props}
      className={`input ${props.className ?? ''}`}
      value={props.data.data ?? ''}
      onChange={event => props.data.updateData(event.target.value)}
      disabled={readonly}
    />
  );
};

export default Textarea;
