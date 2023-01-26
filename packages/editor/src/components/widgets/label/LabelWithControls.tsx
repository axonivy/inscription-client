import { Label } from '@radix-ui/react-label';
import { memo, ReactNode } from 'react';
import './LabelInput.css';
import IvyIcon from '../IvyIcon';
import { IvyIcons } from '@axonivy/editor-icons';

export interface Control {
  label: string;
  icon: IvyIcons;
  active: boolean;
  action: () => void;
}

const LabelWithControls = (props: { label: string; htmlFor: string; controls: Control[]; children: ReactNode }) => (
  <div className='label-input-column'>
    <div className='label-with-controls'>
      <Label className='label' htmlFor={props.htmlFor}>
        {props.label}
      </Label>
      <div className='controls'>
        {props.controls.map((control, index) => (
          <button
            key={index}
            aria-label={control.label}
            className='label-control-button'
            onClick={control.action}
            data-state={control.active ? 'active' : 'inactive'}
          >
            <IvyIcon icon={control.icon} />
          </button>
        ))}
      </div>
    </div>
    {props.children}
  </div>
);

export default memo(LabelWithControls);
