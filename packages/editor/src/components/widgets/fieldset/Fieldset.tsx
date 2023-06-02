import './Fieldset.css';
import { Label } from '@radix-ui/react-label';
import { memo, useMemo } from 'react';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import IvyIcon from '../IvyIcon';
import { Message } from '../../../components/props';
import { LabelProps } from '@radix-ui/react-label';
import { generateId } from '../../../utils/utils';

export interface FieldsetControl {
  label: string;
  icon: IvyIcons;
  active?: boolean;
  action: () => void;
}

export const ResetControl: FieldsetControl = {
  label: 'Reset',
  icon: IvyIcons.Undo,
  active: false,
  action: () => {}
};

export type FieldsetProps = LabelProps & {
  label: string;
  controls?: FieldsetControl[];
  message?: Message;
};

export type FieldsetInputProps = {
  id: string;
  'aria-labelledby': string;
};

export type FieldsetLabelProps = {
  id: string;
  htmlFor: string;
};

type UseFieldsetReturnValue = {
  labelProps: FieldsetLabelProps;
  inputProps: FieldsetInputProps;
};

export function useFieldset(): UseFieldsetReturnValue {
  const id = useMemo(() => `fieldset-${generateId()}`, []);
  const labelId = `${id}-label`;
  const inputId = `${id}-input`;
  return { labelProps: { id: labelId, htmlFor: inputId }, inputProps: { id: inputId, 'aria-labelledby': labelId } };
}

const Fieldset = ({ label, controls, message, children, ...labelProps }: FieldsetProps) => {
  return (
    <div className='fieldset-column'>
      <div className='fieldset-label'>
        <Label {...labelProps} className={`label ${labelProps.className}`}>
          {label}
        </Label>
        <div className='fieldset-controls'>
          {controls?.map((control, index) => (
            <Button
              icon={control.icon}
              key={index}
              aria-label={control.label}
              className='fieldset-control-button'
              onClick={control.action}
              data-state={control.active ? 'active' : 'inactive'}
            />
          ))}
        </div>
      </div>
      {children}
      {message && (
        <div className={`fieldset-message fieldset-${message.severity.toString().toLowerCase()}`}>
          <IvyIcon icon={message.severity} />
          {message.message}
        </div>
      )}
    </div>
  );
};

export default memo(Fieldset);
