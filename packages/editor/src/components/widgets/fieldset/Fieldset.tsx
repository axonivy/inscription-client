import './Fieldset.css';
import { Label } from '@radix-ui/react-label';
import { memo } from 'react';
import { IvyIcons } from '@axonivy/editor-icons';
import Button from '../button/Button';
import IvyIcon from '../IvyIcon';
import { Message } from '../../../components/props';
import { LabelProps } from '@radix-ui/react-label';
import { deepEqual } from '../../../utils/equals';

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

export type FieldsetReset = {
  data: any;
  initData: any;
  resetData: () => void;
};

export type FieldsetProps = LabelProps & {
  label: string;
  reset?: FieldsetReset;
  controls?: FieldsetControl[];
  message?: Message;
};

const Fieldset = (props: FieldsetProps) => {
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
          {props.reset && !deepEqual(props.reset.data, props.reset.initData) && (
            <Button icon={IvyIcons.Undo} aria-label='Reset' className='fieldset-control-button' onClick={props.reset.resetData} />
          )}
        </div>
      </div>
      {props.children}
      {props.message && (
        <div className={`fieldset-message fieldset-${props.message.severity}`}>
          <IvyIcon icon={props.message.severity} />
          {props.message.message}
        </div>
      )}
    </div>
  );
};

export default memo(Fieldset);
