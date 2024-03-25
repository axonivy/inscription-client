import './Input.css';
import type { ComponentProps } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useReadonly } from '@axonivy/ui-components';
import { splitNewLine } from '../../../utils/utils';

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'value' | 'onChange'> & {
  value?: string;
  onChange: (change: string) => void;
  maxRows?: number;
};

const Textarea = ({ value, onChange, maxRows, disabled, ...textareaProps }: TextareaProps) => {
  const [currentValue, setCurrentValue] = useState(value ?? '');
  useEffect(() => {
    setCurrentValue(value ?? '');
  }, [value]);
  const updateValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const update = event.target.value;
    setCurrentValue(update);
    onChange(update);
  };
  const readonly = useReadonly();
  const height = useMemo(() => {
    let rows = splitNewLine(value ?? '').length;
    if (maxRows && rows > maxRows) {
      rows = maxRows;
    }
    return rows * 14;
  }, [maxRows, value]);

  return (
    <textarea
      {...textareaProps}
      className={`input ${textareaProps.className ?? ''}`}
      value={currentValue}
      onChange={updateValue}
      disabled={readonly || disabled}
      style={{ height }}
    />
  );
};

export default Textarea;
