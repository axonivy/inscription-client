import './HeadlineControls.css';
import type { FieldsetControl } from '../fieldset';
import { Button } from '@axonivy/ui-components';

type HeadlineControlsProps = {
  controls: FieldsetControl[];
};

const HeadlineControls = ({ controls }: HeadlineControlsProps) => {
  return (
    <div className='headline-controls'>
      {controls.map((control, index) => (
        <Button
          icon={control.icon}
          key={index}
          aria-label={control.label}
          title={control.label}
          className='headline-control-button'
          onClick={control.action}
          data-state={control.active ? 'active' : 'inactive'}
        />
      ))}
    </div>
  );
};

export default HeadlineControls;
