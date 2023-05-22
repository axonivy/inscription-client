import './Fieldset.css';
import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import IvyIcon from '../IvyIcon';
import { Message } from '../../../components/props';
import { LabelProps } from '@radix-ui/react-label';
import { deepEqual } from '../../../utils/equals';
import { Consumer } from '../../../types/lambda';

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

const Fieldset = <T,>(props: FieldsetProps<T>) => {
  return (
    <div className='fieldset-column'>
      <div className='fieldset-label'>
        <Label {...props} className={`label ${props.className}`}>
          {props.label}
        </Label>
        <div className='fieldset-controls'>
          {props.controls?.map((control, index) => (
            <Button
              icon={control.icon}
              key={index}
              aria-label={control.label}
              className='fieldset-control-button'
              onClick={control.action}
              data-state={control.active ? 'active' : 'inactive'}
            />
          ))}
          {props.data && !deepEqual(props.data.data, props.data.initData) && (
            <Button
              icon={IvyIcons.Undo}
              aria-label='Reset'
              className='fieldset-control-button'
              onClick={() => props.data!.updateData(props.data!.initData)}
            />
          )}
        </div>
      </div>
      {props.children}
      {props.message && (
        <div className={`fieldset-message fieldset-${props.message.severity.toString().toLowerCase()}`}>
          <IvyIcon icon={props.message.severity} />
          {props.message.message}
        </div>
      )}
    </div>
  );
};

export default memo(Fieldset) as typeof Fieldset;
