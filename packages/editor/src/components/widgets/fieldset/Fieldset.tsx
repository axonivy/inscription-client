import './Fieldset.css';
import { Label } from '@radix-ui/react-label';
import { memo, useMemo } from 'react';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import IvyIcon from '../IvyIcon';
import { Message } from '../../../components/props';
import { LabelProps } from '@radix-ui/react-label';
import { deepEqual } from '../../../utils/equals';
import { Consumer } from '../../../types/lambda';
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

export type FieldsetData<T> = {
  data: T;
  initData: T;
  updateData: Consumer<T>;
};

export type FieldsetProps<T> = LabelProps & {
  label: string;
  data?: FieldsetData<T>;
  controls?: FieldsetControl[];
  message?: Message;
};

type UseFieldsetReturnValue = {
  labelProps: { id: string; htmlFor: string };
  inputProps: { id: string; 'aria-labelledby': string };
};

export function useFieldset(): UseFieldsetReturnValue {
  const id = useMemo(() => `fieldset-${generateId()}`, []);
  const labelId = `${id}-label`;
  const inputId = `${id}-input`;
  return { labelProps: { id: labelId, htmlFor: inputId }, inputProps: { id: inputId, 'aria-labelledby': labelId } };
}

const Fieldset = <T,>({ label, data, controls, message, children, ...labelProps }: FieldsetProps<T>) => {
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
          {data && !deepEqual(data.data, data.initData) && (
            <Button
              icon={IvyIcons.Undo}
              aria-label='Reset'
              className='fieldset-control-button'
              onClick={() => data!.updateData(data!.initData)}
            />
          )}
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

export default memo(Fieldset) as typeof Fieldset;
