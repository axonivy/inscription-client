import './HeadlineControls.css';
import Button from '../button/Button';
import type { FieldsetControl } from '../fieldset';

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
